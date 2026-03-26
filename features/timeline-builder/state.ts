import { type Stop, type StopType, type TimelineHeader } from "@/lib/timeline-engine"

function makeId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const STOP_TYPES: StopType[] = ["START", "STOP", "END"]

export const DEFAULT_HEADER: TimelineHeader = {
  eventDate: "Feb 14, 2026",
  vehicle: "White Trolley",
  primaryPocName: "Jane Doe",
  primaryPocPhone: "(555) 123-4567",
}

const DEFAULT_STOPS: Stop[] = [
  {
    id: "",
    type: "START",
    locationName: "Hotel Pickup",
    address: "123 Main St",
    arriveTime: "9:00 AM",
    departTime: "9:10 AM",
  },
  {
    id: "",
    type: "END",
    locationName: "Final Drop",
    address: "456 Oak Ave",
    arriveTime: "1:00 PM",
  },
]

export function initStops(): Stop[] {
  return DEFAULT_STOPS.map((s) => ({ ...s, id: makeId() }))
}

export function makeNewStop(): Stop {
  return {
    id: makeId(),
    type: "STOP",
    locationName: "Drop Location",
    address: "TBD",
    arriveTime: "10:00 AM",
    departTime: "10:10 AM",
  }
}

export function handleTypeChange(newType: StopType, currentStop: Stop): Partial<Stop> {
  const patch: Partial<Stop> = { type: newType }

  if (newType === "END") {
    patch.departTime = undefined
  } else if (!currentStop.departTime?.trim()) {
    patch.departTime = "9:10 AM"
  }

  return patch
}
