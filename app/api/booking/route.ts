import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const TO = process.env.BOOKING_EMAIL_TO ?? "reservations@rumbatoursmiami.com";

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444;width:160px;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;color:#222">${value}</td>
  </tr>`;
}

function buildHtml(data: Record<string, string>) {
  const isVehiclePage = data.source === "fleet-vehicle-page";

  const headerBg = isVehiclePage ? "#1a1a1a" : "#222222";
  const headerLabel = isVehiclePage
    ? `Vehicle inquiry — ${data.vehicle_name ?? "Unknown vehicle"}`
    : "Quote request — Services page";

  const vehicleRows = isVehiclePage
    ? `
      ${row("Vehicle", data.vehicle_name)}
      ${row("Category", data.vehicle_category)}
      ${row("Vehicle Slug", data.vehicle_slug)}
      ${row("Source Page", data.source_page)}
    `
    : `${row("Source Page", data.source_page)}`;

  const contactRows = isVehiclePage
    ? `
      ${row("First Name", data.first_name)}
      ${row("Last Name", data.last_name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
    `
    : `
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
    `;

  const eventRows = isVehiclePage
    ? `
      ${row("Event Date", data.event_date)}
      ${row("Event Type", data.event_type)}
      ${row("Group Size", data.group_size)}
    `
    : `
      ${row("Occasion", data.occasion)}
      ${row("Guest Count", data.guest_count)}
      ${row("Event Date", data.event_date)}
    `;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:${headerBg};padding:20px 28px">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:6px 0 0;color:#ccc;font-size:15px">${headerLabel}</p>
          </td>
        </tr>
        <tr><td style="padding:24px 28px">
          <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Inquiry Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${vehicleRows}
          </table>

          <p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Contact Information</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${contactRows}
          </table>

          <p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Event Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${eventRows}
          </table>

          ${
            data.notes
              ? `<p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Notes</p>
                 <div style="background:#f7f7f7;border-radius:8px;padding:14px 16px;color:#333;font-size:14px;line-height:1.6">${data.notes}</div>`
              : ""
          }
        </td></tr>
        <tr>
          <td style="background:#f7f7f7;padding:16px 28px;text-align:center">
            <p style="margin:0;font-size:12px;color:#999">Submitted via miamiwhitetrolley.com · Reply directly to this email to respond</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildFunnelHtml(data: Record<string, unknown>): string {
  const r = (label: string, value: unknown) => {
    if (!value) return "";
    return `<tr>
      <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444;width:180px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#222">${value}</td>
    </tr>`;
  };

  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const stops = Array.isArray(data.additionalStops) && data.additionalStops.length > 0
    ? (data.additionalStops as string[]).join(" → ")
    : null;

  const priceRange = data.estimatedRange as Record<string, unknown> | null;
  const priceDisplay = priceRange
    ? `$${Number(priceRange.lowWithGratuity).toLocaleString("en-US")} – $${Number(priceRange.highWithGratuity).toLocaleString("en-US")} (est. incl. gratuity)`
    : null;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#1a1a1a;padding:20px 28px">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:6px 0 0;color:#ccc;font-size:15px">New booking request — ${fullName}</p>
          </td>
        </tr>
        <tr><td style="padding:24px 28px">
          <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Contact</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${r("Name", fullName)}
            ${r("Email", data.email)}
            ${r("Phone", data.phone)}
          </table>

          <p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Event</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${r("Occasion", data.occasion)}
            ${r("Date", data.date)}
            ${r("Guests", data.guestCount)}
            ${r("City", data.city)}
          </table>

          <p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Service</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8">
            ${r("Service Type", data.serviceType)}
            ${r("Vehicle", data.vehicleName)}
            ${r("Classic Car Model", data.classicCarModel)}
            ${r("Pickup", data.pickupAddress)}
            ${stops ? r("Stops", stops) : ""}
            ${r("Drop-off", data.dropoffAddress)}
            ${r("Start Time", data.startTime)}
            ${data.hours ? r("Duration", `${data.hours} hours`) : ""}
            ${data.returnTrip ? r("Return Trip", "Yes") : ""}
            ${priceDisplay ? r("Estimated Price", priceDisplay) : ""}
          </table>

          ${data.notes
            ? `<p style="margin:20px 0 16px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Notes</p>
               <div style="background:#f7f7f7;border-radius:8px;padding:14px 16px;color:#333;font-size:14px;line-height:1.6">${data.notes}</div>`
            : ""}
        </td></tr>
        <tr>
          <td style="background:#f7f7f7;padding:16px 28px;text-align:center">
            <p style="margin:0;font-size:12px;color:#999">Submitted via booking funnel · miamiwhitetrolley.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildFunnelConfirmationHtml(data: Record<string, unknown>): string {
  const firstName = (data.firstName as string) ?? "there";
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const r = (label: string, value: unknown) => {
    if (!value) return "";
    return `<tr>
      <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444;width:180px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#222">${value}</td>
    </tr>`;
  };

  const stops = Array.isArray(data.additionalStops) && (data.additionalStops as string[]).length > 0
    ? (data.additionalStops as string[]).join(" → ")
    : null;

  // Build price display from estimatedRange
  const priceRange = data.estimatedRange as Record<string, unknown> | null;
  let priceHtml = "";
  if (priceRange && priceRange.lowWithGratuity) {
    const gratuityPct = Math.round((priceRange.gratuityRate as number) * 100);
    const low = Number(priceRange.lowWithGratuity).toLocaleString("en-US");
    const high = Number(priceRange.highWithGratuity).toLocaleString("en-US");
    const priceStr = low === high ? `$${low}` : `$${low} – $${high}`;
    priceHtml = `
      <p style="margin:20px 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Your Estimated Price</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #d1fae5;background:#f0fdf4;margin-bottom:8px">
        <tr>
          <td style="padding:16px 20px">
            <p style="margin:0;font-size:22px;font-weight:700;color:#065f46">${priceStr}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#047857">Includes ${gratuityPct}% gratuity · This is an estimate — final price confirmed by our team</p>
          </td>
        </tr>
      </table>`;
  } else if (data.vehicleName && String(data.vehicleName).includes("×")) {
    // Multi-unit but no range yet (one-way or flat-rate)
    priceHtml = `
      <p style="margin:20px 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Pricing</p>
      <div style="background:#f0fdf4;border:1px solid #d1fae5;border-radius:8px;padding:14px 16px;margin-bottom:8px">
        <p style="margin:0;font-size:14px;color:#065f46">Our team will prepare your custom quote and send it within 24 hours.</p>
      </div>`;
  }

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%">

        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;text-align:center">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:8px 0 0;color:#ccc;font-size:22px;font-weight:300">Your booking request</p>
          </td>
        </tr>

        <tr><td style="padding:32px 32px 24px">
          <p style="margin:0 0 20px;font-size:16px;color:#222">Hi ${firstName},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.7">
            We received your request and will confirm availability within 24 hours. Here's a copy of everything you submitted.
          </p>

          ${priceHtml}

          <p style="margin:20px 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Your Request</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8;margin-bottom:20px">
            ${r("Name", fullName)}
            ${r("Email", data.email)}
            ${r("Phone", data.phone)}
            ${r("Occasion", data.occasion)}
            ${r("Date", data.date)}
            ${r("Guests", data.guestCount)}
            ${r("City", data.city)}
            ${r("Service Type", data.serviceType)}
            ${r("Vehicle", data.vehicleName)}
            ${r("Pickup", data.pickupAddress)}
            ${stops ? r("Stops", stops) : ""}
            ${r("Drop-off", data.dropoffAddress)}
            ${r("Start Time", data.startTime)}
            ${data.hours ? r("Duration", `${data.hours} hours`) : ""}
            ${data.returnTrip ? r("Return Trip", "Yes") : ""}
            ${data.notes ? r("Notes", data.notes) : ""}
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;border-radius:10px">
            <tr><td style="padding:20px 24px">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Need to reach us?</p>
              <p style="margin:0 0 8px;font-size:14px;color:#333">
                <span style="font-weight:600">Phone:</span>
                <a href="tel:+17865651088" style="color:#1a1a1a;text-decoration:none">&nbsp;(786) 565-1088</a>
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#333">
                <span style="font-weight:600">Email:</span>
                <a href="mailto:reservations@rumbatoursmiami.com" style="color:#1a1a1a;text-decoration:none">&nbsp;reservations@rumbatoursmiami.com</a>
              </p>
              <p style="margin:0;font-size:14px;color:#333">
                <span style="font-weight:600">WhatsApp:</span>
                <a href="https://wa.me/17548005079" style="color:#25d366;text-decoration:none;font-weight:600">&nbsp;Message us on WhatsApp</a>
              </p>
            </td></tr>
          </table>
        </td></tr>

        <tr>
          <td style="background:#f7f7f7;padding:16px 32px;text-align:center;border-top:1px solid #e8e8e8">
            <p style="margin:0;font-size:12px;color:#999">Miami White Trolley · miamiwhitetrolley.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildSubject(data: Record<string, string>) {
  if (data.source === "booking-funnel") {
    const name = data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : data.firstName ?? "Someone";
    return `New booking request — ${data.vehicleName ?? "Vehicle TBD"} · ${name}`;
  }
  if (data.source === "fleet-vehicle-page") {
    const name = data.first_name && data.last_name
      ? `${data.first_name} ${data.last_name}`
      : data.first_name ?? "Someone";
    return `New booking request — ${data.vehicle_name} · ${name}`;
  }
  return `New quote request — ${data.name ?? "Unknown"} · ${data.occasion ?? "Event"}`;
}

function buildConfirmationHtml(data: Record<string, string>) {
  const isVehiclePage = data.source === "fleet-vehicle-page";
  const clientName = isVehiclePage
    ? (data.first_name ?? "there")
    : (data.name ?? "there");

  const summaryRows = isVehiclePage
    ? `
      ${row("Vehicle", data.vehicle_name)}
      ${row("Event Type", data.event_type)}
      ${row("Event Date", data.event_date)}
      ${row("Group Size", data.group_size)}
    `
    : `
      ${row("Occasion", data.occasion)}
      ${row("Event Date", data.event_date)}
      ${row("Guest Count", data.guest_count)}
    `;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;text-align:center">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:8px 0 0;color:#ccc;font-size:22px;font-weight:300">We received your request</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:32px 32px 24px">
          <p style="margin:0 0 16px;font-size:16px;color:#222">Hi ${clientName},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.7">
            Thank you for reaching out to Miami White Trolley. We have received your inquiry and a member of our team will contact you shortly to confirm availability and discuss the details.
          </p>

          <!-- Summary -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Your Request Summary</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8;margin-bottom:28px">
            ${summaryRows}
          </table>

          <!-- Contact block -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;border-radius:10px;padding:0;margin-bottom:8px">
            <tr><td style="padding:20px 24px">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Need to reach us?</p>
              <p style="margin:0 0 8px;font-size:14px;color:#333">
                <span style="font-weight:600">Phone:</span>
                <a href="tel:+17865651088" style="color:#1a1a1a;text-decoration:none">&nbsp;(786) 565-1088</a>
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#333">
                <span style="font-weight:600">Email:</span>
                <a href="mailto:reservations@rumbatoursmiami.com" style="color:#1a1a1a;text-decoration:none">&nbsp;reservations@rumbatoursmiami.com</a>
              </p>
              <p style="margin:0;font-size:14px;color:#333">
                <span style="font-weight:600">WhatsApp:</span>
                <a href="https://wa.me/17548005079" style="color:#25d366;text-decoration:none;font-weight:600">&nbsp;Message us on WhatsApp</a>
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f7f7;padding:16px 32px;text-align:center;border-top:1px solid #e8e8e8">
            <p style="margin:0;font-size:12px;color:#999">Miami White Trolley · miamiwhitetrolley.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function logToSheet(data: Record<string, string>) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((err) => console.error("[booking] sheet log failed", err));
}

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = data.email as string | undefined;
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const isFunnel = data.source === "booking-funnel";
  const internalHtml = isFunnel ? buildFunnelHtml(data) : buildHtml(data as Record<string, string>);
  const confirmationHtml = isFunnel
    ? buildFunnelConfirmationHtml(data)
    : buildConfirmationHtml(data as Record<string, string>);

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Miami White Trolley" <${process.env.GMAIL_USER}>`,
        to: TO,
        replyTo: email,
        subject: buildSubject(data as Record<string, string>),
        html: internalHtml,
      }),
      transporter.sendMail({
        from: `"Miami White Trolley" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "We received your request — Miami White Trolley",
        html: confirmationHtml,
      }),
    ]);

    logToSheet(isFunnel ? { source: "booking-funnel", email, name: `${data.firstName} ${data.lastName}` } : data as Record<string, string>);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[booking] email send failed", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
