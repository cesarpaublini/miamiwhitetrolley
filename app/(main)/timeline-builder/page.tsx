"use client"

import { useState, useCallback } from "react"
import {
  type Stop,
  type StopType,
  normalizeStopType,
  sortStopsByArrival,
} from "@/lib/timeline-engine"
import { buildTimelinePreviewState } from "@/features/timeline-builder/build-preview"
import {
  formatTimelineTextTo12Hour,
  normalizeTime12,
  convert12To24,
  convert24To12,
} from "@/features/timeline-builder/time-format"
import { STOP_TYPES, handleTypeChange, initStops, makeNewStop } from "@/features/timeline-builder/state"
import { Container } from "@/components/layout/Container"
import { vehicles } from "@/lib/fleet-vehicles"

// --- Friendly UI labels ---
const STOP_TYPE_LABELS: Record<StopType, string> = {
  START: "First Pickup",
  STOP: "Stop Along the Way",
  END: "Final Drop-off",
}

const STOP_TYPE_BADGE: Record<StopType, string> = {
  START: "bg-green-100 text-green-700 border border-green-200",
  STOP: "bg-blue-100 text-blue-700 border border-blue-200",
  END: "bg-slate-100 text-slate-600 border border-slate-200",
}

const STOP_TYPE_BORDER: Record<StopType, string> = {
  START: "border-l-green-400",
  STOP: "border-l-blue-400",
  END: "border-l-slate-300",
}

function toEngineDate(isoDate: string): string {
  if (!isoDate) return ""
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const TODAY = new Date().toISOString().slice(0, 10)

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Quinceañera",
  "Prom / School Event",
  "Birthday Party",
  "Other",
]

const HOW_IT_WORKS = [
  {
    number: "01",
    icon: "📋",
    title: "Fill in your stops",
    description:
      "Add each pickup and drop-off location with arrival and departure times. You can add as many stops as your event needs.",
  },
  {
    number: "02",
    icon: "⚡",
    title: "Your timeline builds instantly",
    description:
      "As you type, a professional driver-ready schedule is generated in real time — no waiting, no back-and-forth.",
  },
  {
    number: "03",
    icon: "📬",
    title: "Get it in your inbox",
    description:
      "Enter your contact info and we'll email you a formatted copy to share with your driver, coordinator, or wedding planner.",
  },
]

export default function TimelineBuilderPage() {
  const [header, setHeader] = useState({
    eventDate: "",
    vehicle: vehicles[0]?.name ?? "White Trolley",
    primaryPocName: "",
    primaryPocPhone: "",
    plannerPocName: undefined as string | undefined,
    plannerPocPhone: undefined as string | undefined,
  })
  const [dateValue, setDateValue] = useState("")
  const [stops, setStops] = useState<Stop[]>(() => initStops())
  const [copied, setCopied] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [timelineUnlocked, setTimelineUnlocked] = useState(false)

  // Lead form
  const [leadName, setLeadName] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadEventType, setLeadEventType] = useState(EVENT_TYPES[0])
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle")

  const { timelineText, inlineErrors } = buildTimelinePreviewState(header, stops)
  const previewText = formatTimelineTextTo12Hour(timelineText)

  const hasBlockingErrors =
    inlineErrors.global.length > 0 ||
    Object.keys(inlineErrors.header).length > 0 ||
    Object.values(inlineErrors.rows).reduce((c, f) => c + Object.keys(f).length, 0) > 0

  // --- Stop callbacks ---
  const updateStop = useCallback((index: number, patch: Partial<Stop>) => {
    setStops((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  }, [])

  const removeStop = useCallback((index: number) => {
    setStops((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const swapUp = useCallback((index: number) => {
    if (index <= 0) return
    setStops((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }, [])

  const swapDown = useCallback((index: number) => {
    setStops((prev) => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }, [])

  const sortByArrival = useCallback(() => {
    setStops((prev) => {
      const with24h = prev.map((s) => {
        const normalizedType = normalizeStopType(s.type)
        const arriveNorm = normalizeTime12(s.arriveTime)
        const departNorm = normalizedType === "END" ? null : normalizeTime12(s.departTime ?? "")
        return {
          ...s,
          type: normalizedType,
          arriveTime: arriveNorm.ok ? convert12To24(arriveNorm.value) : "09:00",
          departTime:
            normalizedType === "END"
              ? undefined
              : departNorm?.ok
                ? convert12To24(departNorm.value)
                : s.departTime,
        }
      })
      const sorted = sortStopsByArrival(with24h)
      return sorted.map((s) => ({
        ...s,
        arriveTime: convert24To12(s.arriveTime),
        departTime: s.departTime ? convert24To12(s.departTime) : undefined,
      }))
    })
  }, [])

  const addStop = useCallback(() => {
    setStops((prev) => [...prev, makeNewStop()])
  }, [])

  const handleTypeChangeForStop = useCallback(
    (index: number, newType: StopType) => {
      updateStop(index, handleTypeChange(newType, stops[index]))
    },
    [stops, updateStop]
  )

  const handleCopy = async () => {
    if (hasBlockingErrors) return
    try {
      await navigator.clipboard.writeText(previewText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState("loading")
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "timeline-builder",
          source_page: "/timeline-builder",
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          occasion: leadEventType,
          event_date: header.eventDate,
          notes: previewText,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setShowLeadModal(false)
      setTimelineUnlocked(true)
      setSubmitState("idle")
    } catch {
      setSubmitState("error")
    }
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20"
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500"
  const errorInputClass = "border-red-300 focus:border-red-500 focus:ring-red-500/20"

  const getFieldError = (
    index: number,
    field: "type" | "arriveTime" | "departTime" | "locationName" | "address"
  ): string | null => inlineErrors.rows[index]?.[field] ?? null

  return (
    <div className="bg-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pb-16 pt-16 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
              Free Planning Tool
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl">
              Plan Your Perfect Event Transportation
            </h1>
            <p className="text-base leading-7 text-zinc-600 max-w-xl">
              Tell us your stops and we&apos;ll build a professional, driver-ready timeline in seconds.
              No phone calls, no spreadsheets — just fill in the details and get your schedule sent straight to your inbox.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600">
              <li className="inline-flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Free to use
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Ready in minutes
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Sent to your email
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Share with your planner or venue
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="border-t border-[#EBEBEB] bg-zinc-100/70 py-10">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-zinc-200 text-sm font-bold text-zinc-400">
                  {step.number}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                  <p className="text-sm leading-6 text-zinc-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Builder Form ─────────────────────────────────────── */}
      <section className="border-t border-[#EBEBEB] py-16 sm:py-20">
        <Container className="space-y-6">

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
              Start Planning
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Build your timeline
            </h2>
            <p className="text-base leading-7 text-zinc-600 max-w-xl">
              Fill in the details below. Times use h:mm AM/PM format — for example, 5:30 PM.
            </p>
          </div>

          {/* Event Details */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400 mb-5">
              Event Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Event Date</label>
                <input
                  type="date"
                  value={dateValue}
                  min={TODAY}
                  onChange={(e) => {
                    setDateValue(e.target.value)
                    setHeader((h) => ({ ...h, eventDate: toEngineDate(e.target.value) }))
                  }}
                  className={`${inputClass} ${inlineErrors.header.eventDate ? errorInputClass : ""}`}
                />
                {inlineErrors.header.eventDate && (
                  <p className="mt-1 text-xs text-red-600">{inlineErrors.header.eventDate}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Vehicle</label>
                <select
                  value={header.vehicle}
                  onChange={(e) => setHeader((h) => ({ ...h, vehicle: e.target.value }))}
                  className={`${inputClass} ${inlineErrors.header.vehicle ? errorInputClass : ""}`}
                >
                  {vehicles.map((v) => (
                    <option key={v.slug} value={v.name}>{v.name}</option>
                  ))}
                </select>
                {inlineErrors.header.vehicle && (
                  <p className="mt-1 text-xs text-red-600">{inlineErrors.header.vehicle}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Your Name</label>
                <input
                  type="text"
                  value={header.primaryPocName}
                  onChange={(e) => setHeader((h) => ({ ...h, primaryPocName: e.target.value }))}
                  placeholder="Full name"
                  className={`${inputClass} ${inlineErrors.header.primaryPocName ? errorInputClass : ""}`}
                />
                {inlineErrors.header.primaryPocName && (
                  <p className="mt-1 text-xs text-red-600">{inlineErrors.header.primaryPocName}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Your Phone</label>
                <input
                  type="tel"
                  value={header.primaryPocPhone}
                  onChange={(e) => setHeader((h) => ({ ...h, primaryPocPhone: e.target.value }))}
                  placeholder="(305) 000-0000"
                  className={`${inputClass} ${inlineErrors.header.primaryPocPhone ? errorInputClass : ""}`}
                />
                {inlineErrors.header.primaryPocPhone && (
                  <p className="mt-1 text-xs text-red-600">{inlineErrors.header.primaryPocPhone}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Coordinator Name{" "}
                  <span className="normal-case font-normal text-zinc-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={header.plannerPocName ?? ""}
                  onChange={(e) =>
                    setHeader((h) => ({ ...h, plannerPocName: e.target.value || undefined }))
                  }
                  placeholder="Event planner or coordinator"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Coordinator Phone{" "}
                  <span className="normal-case font-normal text-zinc-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={header.plannerPocPhone ?? ""}
                  onChange={(e) =>
                    setHeader((h) => ({ ...h, plannerPocPhone: e.target.value || undefined }))
                  }
                  placeholder="(305) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Stops */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Your Stops
              </h3>
              <button
                type="button"
                onClick={sortByArrival}
                className="text-xs text-zinc-400 hover:text-zinc-600 underline underline-offset-2 transition-colors"
              >
                Sort by arrival time
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {stops.map((stop, i) => {
                const stopType = normalizeStopType(stop.type)
                return (
                  <div
                    key={stop.id}
                    className={`rounded-2xl border border-zinc-200 border-l-4 ${STOP_TYPE_BORDER[stopType]} bg-white p-5 shadow-sm`}
                  >
                    {/* Card header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${STOP_TYPE_BADGE[stopType]}`}>
                          {STOP_TYPE_LABELS[stopType]}
                        </span>
                        <span className="text-xs text-zinc-400">Stop {i + 1}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => swapUp(i)}
                          disabled={i === 0}
                          className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-50 disabled:opacity-30 transition-colors"
                          title="Move up"
                        >↑</button>
                        <button
                          type="button"
                          onClick={() => swapDown(i)}
                          disabled={i === stops.length - 1}
                          className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-50 disabled:opacity-30 transition-colors"
                          title="Move down"
                        >↓</button>
                        <button
                          type="button"
                          onClick={() => removeStop(i)}
                          className="ml-1 rounded border border-red-100 px-2 py-1 text-xs text-red-400 hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Card fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className={labelClass}>Stop Type</label>
                        <select
                          value={stopType}
                          onChange={(e) => handleTypeChangeForStop(i, e.target.value as StopType)}
                          className={`${inputClass} ${getFieldError(i, "type") ? errorInputClass : ""}`}
                        >
                          {STOP_TYPES.map((t) => (
                            <option key={t} value={t}>{STOP_TYPE_LABELS[t]}</option>
                          ))}
                        </select>
                        {getFieldError(i, "type") && (
                          <p className="mt-1 text-xs text-red-600">{getFieldError(i, "type")}</p>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Location Name</label>
                        <input
                          type="text"
                          value={stop.locationName ?? ""}
                          onChange={(e) => updateStop(i, { locationName: e.target.value || undefined })}
                          placeholder="Venue or landmark"
                          className={`${inputClass} ${getFieldError(i, "locationName") ? errorInputClass : ""}`}
                        />
                        {getFieldError(i, "locationName") && (
                          <p className="mt-1 text-xs text-red-600">{getFieldError(i, "locationName")}</p>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Address</label>
                        <input
                          type="text"
                          value={stop.address ?? ""}
                          onChange={(e) => updateStop(i, { address: e.target.value || undefined })}
                          placeholder="Street, city"
                          className={`${inputClass} ${getFieldError(i, "address") ? errorInputClass : ""}`}
                        />
                        {getFieldError(i, "address") && (
                          <p className="mt-1 text-xs text-red-600">{getFieldError(i, "address")}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Arrive</label>
                          <input
                            type="text"
                            value={stop.arriveTime}
                            onChange={(e) => updateStop(i, { arriveTime: e.target.value })}
                            placeholder="3:00 PM"
                            className={`${inputClass} ${getFieldError(i, "arriveTime") ? errorInputClass : ""}`}
                          />
                          {getFieldError(i, "arriveTime") && (
                            <p className="mt-1 text-xs text-red-600">Use h:mm AM/PM</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Depart</label>
                          <input
                            type="text"
                            value={stopType === "END" ? "" : (stop.departTime ?? "")}
                            onChange={(e) =>
                              updateStop(i, { departTime: e.target.value.trim() || undefined })
                            }
                            placeholder={stopType === "END" ? "—" : "3:30 PM"}
                            disabled={stopType === "END"}
                            className={`${inputClass} ${getFieldError(i, "departTime") ? errorInputClass : ""} disabled:bg-zinc-50 disabled:text-zinc-300 disabled:cursor-not-allowed`}
                          />
                          {getFieldError(i, "departTime") && (
                            <p className="mt-1 text-xs text-red-600">Must be after arrive</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={addStop}
              className="mt-3 w-full rounded-2xl border-2 border-dashed border-zinc-200 py-3 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 transition-colors"
            >
              + Add Another Stop
            </button>
          </div>

          {/* Global validation errors */}
          {inlineErrors.global.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {inlineErrors.global.join(" ")}
            </div>
          )}

          {/* CTA / Timeline reveal */}
          {!timelineUnlocked ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-100/70 p-8 text-center">
              <p className="text-base font-semibold tracking-tight text-zinc-900 mb-1">
                Ready to see your timeline?
              </p>
              <p className="text-sm leading-6 text-zinc-600 mb-6">
                Enter your contact info and we&apos;ll send a formatted copy to your email right away.
              </p>
              <button
                type="button"
                onClick={() => !hasBlockingErrors && setShowLeadModal(true)}
                disabled={hasBlockingErrors}
                className="rounded-xl bg-zinc-900 px-10 py-3 text-sm font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
              >
                Get My Timeline
              </button>
              {hasBlockingErrors && (
                <p className="mt-3 text-xs text-zinc-400">Fix the highlighted fields above to continue.</p>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Your timeline is ready</p>
                  <p className="text-xs text-zinc-400 mt-0.5">A copy has been sent to your email.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Timeline"}
                </button>
              </div>
              <pre className="overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                {previewText}
              </pre>
            </div>
          )}

        </Container>
      </section>

      {/* ── Lead capture modal ───────────────────────────────── */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-1">
              Your timeline is ready!
            </h2>
            <p className="text-sm leading-6 text-zinc-600 mb-6">
              Enter your details and we&apos;ll email you a copy right away.
            </p>

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Your Name</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Phone{" "}
                  <span className="normal-case font-normal text-zinc-400">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="(305) 000-0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Event Type</label>
                <select
                  value={leadEventType}
                  onChange={(e) => setLeadEventType(e.target.value)}
                  className={inputClass}
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {submitState === "error" && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => { setShowLeadModal(false); setSubmitState("idle") }}
                  className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="flex-1 rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  {submitState === "loading" ? "Sending…" : "Send My Timeline"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
