"use client";

import { useState } from "react";
import { siteConfig, type ServiceSlug } from "@/lib/site-config";

interface Props {
  serviceSlug?: ServiceSlug;
  cityName?: string;
}

export function QuoteForm({ serviceSlug, cityName }: Props) {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot — ignore bots
    if (data.company_website) return;

    const service = serviceSlug
      ? siteConfig.services.find((s) => s.slug === serviceSlug)?.name
      : "General inquiry";

    const subject = `Quote request — ${service} (${data.city || cityName || "—"})`;

    const lines = [
      `Service: ${service}`,
      `City: ${data.city || cityName || "—"}`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      data.squareFootage ? `Approx sq ft: ${data.squareFootage}` : null,
      "",
      "Message:",
      data.message,
    ].filter(Boolean) as string[];

    const mailto = `mailto:${siteConfig.nap.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
    setOpened(true);
  }

  if (opened) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-8">
        <p className="font-display text-2xl">Email window opened.</p>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Send the prefilled email and we&rsquo;ll be in touch within one business day.
          For anything urgent, call{" "}
          <a href={`tel:${siteConfig.nap.telephone}`} className="underline">
            {siteConfig.nap.telephoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setOpened(false)}
          className="mt-6 text-sm underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  const serviceLabel = serviceSlug
    ? siteConfig.services.find((s) => s.slug === serviceSlug)?.name
    : undefined;

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-6 md:p-8"
    >
      <div className="grid gap-1">
        <p className="font-display text-2xl">
          {serviceLabel ? `Quote: ${serviceLabel}` : "Request a quote"}
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          A few details and we&rsquo;ll come back with a real number.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="City / area" name="city" defaultValue={cityName} />
      </div>

      <Field
        label="Approx. square footage (optional)"
        name="squareFootage"
        type="number"
      />

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">Tell us about the job</span>
        <textarea
          name="message"
          rows={4}
          required
          className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm focus:border-[var(--color-fg)] focus:outline-none"
          placeholder="Hardwood throughout main floor, ~800 sq ft, hoping to start in March…"
        />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <button
        type="submit"
        className="rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
      >
        Send via email
      </button>

      <p className="text-xs text-[var(--color-muted)]">
        Submitting opens your email app with the details prefilled. Prefer the
        phone? Call{" "}
        <a
          href={`tel:${siteConfig.nap.telephone}`}
          className="underline underline-offset-4"
        >
          {siteConfig.nap.telephoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm focus:border-[var(--color-fg)] focus:outline-none"
      />
    </label>
  );
}
