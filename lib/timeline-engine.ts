// src/lib/timeline-engine.ts
// Pure functions only. No UI. No Next.js. No side effects.

export type StopType = "START" | "STOP" | "END"

export type TimelineHeader = {
  eventDate: string
  vehicle: string
  primaryPocName: string
  primaryPocPhone: string
  plannerPocName?: string
  plannerPocPhone?: string
}

export type Stop = {
  id: string
  type: StopType
  locationName?: string
  address?: string
  arriveTime: string
  departTime?: string
  stopDescription?: string
  passengers?: string
}

/** Map legacy types to new structural types (PICKUP→START, DROPOFF→STOP, FINAL→END) */
export function normalizeStopType(type: string): StopType {
  const map: Record<string, StopType> = {
    PICKUP: "START",
    DROPOFF: "STOP",
    FINAL: "END",
  }
  return (map[type] ?? type) as StopType
}

export type ValidationResult = {
  blockingErrors: string[]
  warnings: string[]
}

// --- Helpers ---

const HHMM_REGEX = /^([0-1]?\d|2[0-3]):([0-5]\d)$/

const STANDBY_THRESHOLD_MINUTES = 15

function minutesBetween(later: string, earlier: string): number {
  return parseTimeToMinutes(later) - parseTimeToMinutes(earlier)
}

export function parseTimeToMinutes(time: string): number {
  if (!HHMM_REGEX.test(time)) {
    throw new Error(`Invalid time format: "${time}". Expected "HH:mm" 24h.`)
  }
  const [hours, minutes] = time.split(":").map(Number)
  const total = hours * 60 + minutes
  return Math.max(0, Math.min(1439, total))
}

export function minutesToTime(mins: number): string {
  const clamped = Math.max(0, Math.min(1439, Math.floor(mins)))
  const h = Math.floor(clamped / 60)
  const m = clamped % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function stopLabel(stop: Stop): string {
  return `${stop.type} - ${stop.locationName ?? "Unknown Location"}`
}

// --- Core functions ---

export function sortStopsByArrival(stops: Stop[]): Stop[] {
  const decorated = stops.map((stop, index) => ({ stop, index }))
  decorated.sort((a, b) => {
    const aMins = parseTimeToMinutes(a.stop.arriveTime)
    const bMins = parseTimeToMinutes(b.stop.arriveTime)
    if (aMins !== bMins) return aMins - bMins
    return a.index - b.index
  })
  return decorated.map(({ stop }) => stop)
}

export function validateTimeline(
  header: TimelineHeader,
  stops: Stop[]
): ValidationResult {
  const blockingErrors: string[] = []
  const warnings: string[] = []

  // Exactly one END
  const endStops = stops.filter((s) => s.type === "END")
  if (endStops.length === 0) {
    blockingErrors.push("Missing END stop.")
  } else if (endStops.length > 1) {
    blockingErrors.push("Multiple END stops. Exactly one END is required.")
  }

  // Required header fields
  if (!header.eventDate?.trim()) {
    blockingErrors.push("Missing required field: eventDate.")
  }
  if (!header.vehicle?.trim()) {
    blockingErrors.push("Missing required field: vehicle.")
  }
  if (!header.primaryPocName?.trim()) {
    blockingErrors.push("Missing required field: primaryPocName.")
  }
  if (!header.primaryPocPhone?.trim()) {
    blockingErrors.push("Missing required field: primaryPocPhone.")
  }

  // Required fields per stop
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i]
    const prefix = `Stop ${i + 1} (${s.id}):`

    if (!s.id?.trim()) {
      blockingErrors.push(`${prefix} Missing required field: id.`)
    }
    if (!s.type) {
      blockingErrors.push(`${prefix} Missing required field: type.`)
    }
    if (!s.arriveTime) {
      blockingErrors.push(`${prefix} Missing required field: arriveTime.`)
    }
    if (!s.locationName?.trim()) {
      blockingErrors.push(`${prefix} Missing required field: locationName.`)
    }
    if (!s.address?.trim()) {
      blockingErrors.push(`${prefix} Missing required field: address.`)
    }
    if (s.type !== "END") {
      if (!s.departTime?.trim()) {
        blockingErrors.push(`${prefix} Depart is required for START and STOP.`)
      } else {
        try {
          parseTimeToMinutes(s.departTime)
        } catch {
          blockingErrors.push(`${prefix} Depart must be valid time (HH:mm).`)
        }
        // departTime < arriveTime
        try {
          if (s.departTime && parseTimeToMinutes(s.departTime) < parseTimeToMinutes(s.arriveTime)) {
            blockingErrors.push(`${prefix} Depart must be after arrive.`)
          }
        } catch {
          /* skip if parse failed */
        }
      }
    }
  }

  // Overlaps: sort by arrival, then check each pair
  const withParsed: { stop: Stop; arriveMins: number; index: number }[] = []
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i]
    try {
      withParsed.push({ stop: s, arriveMins: parseTimeToMinutes(s.arriveTime), index: i })
    } catch {
      // Invalid arriveTime - skip from overlap checks
    }
  }
  withParsed.sort((a, b) => (a.arriveMins !== b.arriveMins ? a.arriveMins - b.arriveMins : a.index - b.index))

  // END must be last stop chronologically
  if (endStops.length === 1 && withParsed.length > 0) {
    const lastInSorted = withParsed[withParsed.length - 1].stop
    if (lastInSorted.type !== "END") {
      blockingErrors.push("END stop must be the last stop in the timeline.")
    }
  }

  for (let i = 1; i < withParsed.length; i++) {
    const prev = withParsed[i - 1].stop
    const curr = withParsed[i].stop
    const prevDepart = prev.type === "END" ? prev.arriveTime : (prev.departTime ?? prev.arriveTime)
    const currArrive = curr.arriveTime

    let prevDepartMins: number
    let currArriveMins: number
    try {
      prevDepartMins = parseTimeToMinutes(prevDepart)
      currArriveMins = parseTimeToMinutes(currArrive)
    } catch {
      continue
    }

    if (currArriveMins < prevDepartMins) {
      blockingErrors.push(
        `Overlap: ${stopLabel(curr)} (arrive ${currArrive}) starts before ${stopLabel(prev)} departs (${prevDepart}).`
      )
    }
  }

  return { blockingErrors, warnings }
}

export function generateTimelineText(
  header: TimelineHeader,
  stops: Stop[]
): string {
  const lines: string[] = []

  // Derive rental window from first stop arriveTime and FINAL arriveTime
  let derivedStart = ""
  let derivedEnd = ""
  if (stops.length > 0) {
    let earliestMins = 9999
    let finalMins = -1
    for (const s of stops) {
      try {
        const m = parseTimeToMinutes(s.arriveTime)
        earliestMins = Math.min(earliestMins, m)
        if (s.type === "END") {
          finalMins = Math.max(finalMins, m)
        }
      } catch {
        /* skip */
      }
    }
    if (earliestMins < 9999) derivedStart = minutesToTime(earliestMins)
    if (finalMins >= 0) derivedEnd = minutesToTime(finalMins)
  }

  // EVENT DETAILS
  lines.push("EVENT DETAILS")
  lines.push(`Vehicle: ${header.vehicle}`)
  lines.push(`Event Date: ${header.eventDate}`)
  lines.push(`Rental Window: ${derivedStart || "—"} – ${derivedEnd || "—"}`)
  lines.push(`Primary POC: ${header.primaryPocName} — ${header.primaryPocPhone}`)
  if (header.plannerPocName?.trim() && header.plannerPocPhone?.trim()) {
    lines.push(`Planner: ${header.plannerPocName} — ${header.plannerPocPhone}`)
  }
  lines.push("")

  // TIMELINE
  lines.push("TIMELINE")

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i]
    const locationName = stop.locationName ?? "Unknown Location"
    const address = stop.address ?? ""
    const nextStop = stops[i + 1]
    const nextLocation = nextStop?.locationName?.trim()

    if (stop.type === "END") {
      lines.push(`${stop.arriveTime} — END — ${locationName}`)
      lines.push(`Address: ${address}`)
      lines.push("Service Complete.")
    } else {
      lines.push(`${stop.arriveTime} — ARRIVE AT — ${locationName}`)
      lines.push(`Address: ${address}`)
      lines.push("")

      const depart = stop.departTime ?? stop.arriveTime
      try {
        const dwellMinutes = minutesBetween(depart, stop.arriveTime)
        if (dwellMinutes >= STANDBY_THRESHOLD_MINUTES) {
          lines.push(`${stop.arriveTime}–${depart} — ON SITE / STANDBY — ${locationName}`)
          lines.push("")
        }
      } catch {
        /* skip standby if times invalid */
      }
      if (nextLocation) {
        lines.push(`${depart} — DEPART FROM — ${locationName} → ${nextLocation}`)
      } else {
        lines.push(`${depart} — DEPART FROM — ${locationName}`)
      }
      if (i < stops.length - 1) {
        lines.push("")
      }
    }
  }

  return lines.join("\n")
}
