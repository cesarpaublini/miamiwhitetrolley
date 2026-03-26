import {
  type Stop,
  type TimelineHeader,
  type StopType,
  normalizeStopType,
  sortStopsByArrival,
  generateTimelineText,
} from "@/lib/timeline-engine"
import {
  convert12To24,
  normalizeTime12,
} from "@/features/timeline-builder/time-format"

export type TimelinePreviewState = {
  headerForEngine: TimelineHeader
  stopsForEngine: Stop[]
  validation: {
    blockingErrors: string[]
    warnings: string[]
  }
  inlineErrors: InlineErrors
  timelineText: string
}

type HeaderField =
  | "eventDate"
  | "vehicle"
  | "primaryPocName"
  | "primaryPocPhone"
  | "plannerPocName"
  | "plannerPocPhone"

type StopField = "type" | "arriveTime" | "departTime" | "locationName" | "address"

export type InlineErrors = {
  header: Partial<Record<HeaderField, string>>
  rows: Record<number, Partial<Record<StopField, string>>>
  global: string[]
}

function buildEmptyInlineErrors(): InlineErrors {
  return {
    header: {},
    rows: {},
    global: [],
  }
}

function setRowError(
  rows: Record<number, Partial<Record<StopField, string>>>,
  rowIndex: number,
  field: StopField,
  message: string
): void {
  if (!rows[rowIndex]) {
    rows[rowIndex] = {}
  }
  if (!rows[rowIndex][field]) {
    rows[rowIndex][field] = message
  }
}

function hasInlineErrors(errors: InlineErrors): boolean {
  return (
    Object.keys(errors.header).length > 0 ||
    Object.keys(errors.rows).length > 0 ||
    errors.global.length > 0
  )
}

function normalizeType(input: string): StopType | null {
  const value = normalizeStopType(input)
  if (value === "START" || value === "STOP" || value === "END") {
    return value
  }
  return null
}

function buildInlineErrors(header: TimelineHeader, stops: Stop[]): InlineErrors {
  const inline = buildEmptyInlineErrors()

  if (!header.eventDate.trim()) {
    inline.header.eventDate = "Event date is required."
  }
  if (!header.vehicle.trim()) {
    inline.header.vehicle = "Vehicle is required."
  }
  if (!header.primaryPocName.trim()) {
    inline.header.primaryPocName = "Primary POC name is required."
  }
  if (!header.primaryPocPhone.trim()) {
    inline.header.primaryPocPhone = "Primary POC phone is required."
  }

  const normalizedStops = stops.map((stop, index) => {
    const parsedType = normalizeType(stop.type)
    if (!parsedType) {
      setRowError(inline.rows, index, "type", "Set a valid stop type.")
    }

    const arrive = normalizeTime12(stop.arriveTime)
    if (!arrive.ok) {
      setRowError(inline.rows, index, "arriveTime", "Use h:mm AM/PM format.")
    }

    if (!stop.locationName?.trim()) {
      setRowError(inline.rows, index, "locationName", "Location is required.")
    }

    if (!stop.address?.trim()) {
      setRowError(inline.rows, index, "address", "Address is required.")
    }

    let departMinutes: number | null = null
    if (parsedType !== "END") {
      if (!stop.departTime?.trim()) {
        setRowError(inline.rows, index, "departTime", "Depart time is required.")
      } else {
        const depart = normalizeTime12(stop.departTime)
        if (!depart.ok) {
          setRowError(inline.rows, index, "departTime", "Use h:mm AM/PM format.")
        } else {
          departMinutes = toMinutes(convert12To24(depart.value))
        }
      }
    }

    const arriveMinutes = arrive.ok ? toMinutes(convert12To24(arrive.value)) : null
    if (arriveMinutes != null && departMinutes != null && departMinutes < arriveMinutes) {
      setRowError(inline.rows, index, "departTime", "Depart must be after arrive.")
    }

    return {
      index,
      type: parsedType,
      arriveMinutes,
      departMinutes,
    }
  })

  const endRows = normalizedStops.filter((stop) => stop.type === "END")
  if (endRows.length === 0) {
    inline.global.push("Add one END stop.")
  }
  if (endRows.length > 1) {
    for (const endRow of endRows) {
      setRowError(inline.rows, endRow.index, "type", "Use exactly one END stop.")
    }
  }

  const sortedWithTime = normalizedStops
    .filter((stop) => stop.arriveMinutes != null)
    .sort((a, b) =>
      a.arriveMinutes !== b.arriveMinutes
        ? (a.arriveMinutes as number) - (b.arriveMinutes as number)
        : a.index - b.index
    )

  if (endRows.length === 1 && sortedWithTime.length > 0) {
    const last = sortedWithTime[sortedWithTime.length - 1]
    if (last.index !== endRows[0].index) {
      setRowError(inline.rows, endRows[0].index, "type", "END must be the last arrival.")
    }
  }

  for (let i = 1; i < sortedWithTime.length; i++) {
    const previous = sortedWithTime[i - 1]
    const current = sortedWithTime[i]
    const previousDepart = previous.type === "END"
      ? previous.arriveMinutes
      : previous.departMinutes ?? previous.arriveMinutes

    if (previousDepart == null || current.arriveMinutes == null) {
      continue
    }

    if (current.arriveMinutes < previousDepart) {
      setRowError(
        inline.rows,
        current.index,
        "arriveTime",
        `Overlaps with previous stop (${stops[previous.index].locationName ?? `Stop ${previous.index + 1}`}).`
      )
    }
  }

  return inline
}

function toEngineStops(stops: Stop[]): Stop[] {
  return stops.map((stop) => {
    const normalizedType = normalizeStopType(stop.type)
    const arriveNorm = normalizeTime12(stop.arriveTime)
    const departNorm = normalizedType === "END"
      ? { ok: true as const, value: stop.arriveTime }
      : normalizeTime12(stop.departTime ?? "")

    return {
      ...stop,
      type: normalizedType,
      arriveTime: arriveNorm.ok ? convert12To24(arriveNorm.value) : "09:00",
      departTime:
        normalizedType === "END"
          ? undefined
          : departNorm.ok
            ? convert12To24(departNorm.value)
            : stop.departTime?.trim()
              ? "09:10"
              : undefined,
    }
  })
}

function toMinutes(time24: string): number {
  const [hours, minutes] = time24.split(":").map(Number)
  return hours * 60 + minutes
}

function toBlockingErrors(inlineErrors: InlineErrors): string[] {
  const rowErrors = Object.entries(inlineErrors.rows).flatMap(([row, fields]) =>
    Object.values(fields).map((message) => `Stop ${Number(row) + 1}: ${message}`)
  )
  return [...inlineErrors.global, ...Object.values(inlineErrors.header), ...rowErrors]
}

export function buildTimelinePreviewState(
  header: TimelineHeader,
  stops: Stop[]
): TimelinePreviewState {
  const headerForEngine: TimelineHeader = { ...header }
  const inlineErrors = buildInlineErrors(headerForEngine, stops)
  const stopsForEngine = toEngineStops(stops)
  const sortedStops = sortStopsByArrival(stopsForEngine)

  let validation = { blockingErrors: toBlockingErrors(inlineErrors), warnings: [] as string[] }
  let timelineText = ""

  try {
    if (!hasInlineErrors(inlineErrors)) {
      timelineText = generateTimelineText(headerForEngine, sortedStops)
    }
  } catch {
    validation = { blockingErrors: ["Invalid timeline data."], warnings: [] }
    timelineText = ""
  }

  return {
    headerForEngine,
    stopsForEngine: sortedStops,
    validation,
    inlineErrors,
    timelineText,
  }
}
