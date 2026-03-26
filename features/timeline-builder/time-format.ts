import { parseTimeToMinutes } from "@/lib/timeline-engine"

export function normalizeTime12(
  input: string
): { ok: true; value: string } | { ok: false } {
  const s = input.trim()
  if (!s) return { ok: false }
  const match = s.match(/^(\d{1,2})(?::(\d{1,2}))?\s*(am|pm|a|p)\s*$/i)
  if (!match) return { ok: false }

  let h = parseInt(match[1], 10)
  const mStr = match[2]
  const m = mStr != null ? parseInt(mStr, 10) : 0
  const ampmRaw = match[3].toUpperCase()
  const ampm = ampmRaw === "A" ? "AM" : ampmRaw === "P" ? "PM" : ampmRaw

  if (h < 1 || h > 12) return { ok: false }
  if (m < 0 || m > 59) return { ok: false }

  return { ok: true, value: `${h}:${String(m).padStart(2, "0")} ${ampm}` }
}

export function convert12To24(normalized: string): string {
  const match = normalized.trim().match(/^(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i)
  if (!match) throw new Error(`Invalid 12h format: "${normalized}"`)

  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const ampm = match[3].toUpperCase()

  if (ampm === "AM") {
    h = h === 12 ? 0 : h
  } else {
    h = h === 12 ? 12 : h + 12
  }

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

export function convert24To12(time24: string): string {
  const match = time24.trim().match(/^([0-1]?\d|2[0-3]):([0-5]\d)$/)
  if (!match) throw new Error(`Invalid 24h format: "${time24}"`)

  const h24 = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const h12 = h24 == 0 ? 12 : h24 > 12 ? h24 - 12 : h24
  const ampm = h24 < 12 ? "AM" : "PM"

  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`
}

export function formatTimelineTextTo12Hour(text: string): string {
  return text.replace(/\b([01]\d|2[0-3]):([0-5]\d)\b/g, (match) => convert24To12(match))
}

export function isChronologicallyOutOfOrder(times24h: string[]): boolean {
  for (let i = 0; i < times24h.length - 1; i++) {
    const curr = parseTimeToMinutes(times24h[i])
    const next = parseTimeToMinutes(times24h[i + 1])
    if (curr > next) return true
  }
  return false
}
