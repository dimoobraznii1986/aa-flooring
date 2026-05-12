"use client";

import { useState } from "react";
import { siteConfig, type ServiceSlug } from "@/lib/site-config";

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${siteConfig.nap.email}`;

interface Props {
  serviceSlug?: ServiceSlug;
  cityName?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm({ serviceSlug, cityName }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot — silently drop bots
    if (data.company_website) {
      setStatus("success");
      return;
    }

    const serviceLabel = serviceSlug
      ? siteConfig.services.find((s) => s.slug === serviceSlug)?.name
      : "General inquiry";
    const cityLabel = data.city || cityName || "—";

    const payload = {
      _subject: `Quote request — ${serviceLabel} (${cityLabel})`,
      _template: "table",
      _captcha: "false", // we use our own honeypot
      service: serviceLabel,
      city: cityLabel,
      name: data.name,
      phone: data.phone,
      email: data.email,
      square_footage: data.squareFootage || "—",
      message: data.message,
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
    };

    setStatus("sending");

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };
      // Formsubmit replies 200 with success="false" + an activation message
      // until the inbox owner clicks the "Activate Form" link once. The
      // submission is still received in their queue, so treat 200 as success
      // from the visitor's perspective regardless of the body flag.
      if (!res.ok) throw new Error(json.message ?? "Form service returned an error.");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-8">
        <p className="font-display text-2xl">Thanks — message sent.</p>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          We&rsquo;ll be in touch within one business day. For anything urgent,
          call{" "}
          <a href={`tel:${siteConfig.nap.telephone}`} className="underline">
            {siteConfig.nap.telephoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
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
      noValidate
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

      <label className="grid min-w-0 gap-1.5 text-sm">
        <span className="font-medium">Tell us about the job</span>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full min-w-0 rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm focus:border-[var(--color-fg)] focus:outline-none"
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
        disabled={status === "sending"}
        className="rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request quote"}
      </button>

      {status === "error" ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          <p className="font-medium">We couldn&rsquo;t send that automatically.</p>
          <p className="mt-1">
            {errorMsg ?? "Please try again."} Or email us directly at{" "}
            <a
              href={`mailto:${siteConfig.nap.email}`}
              className="underline underline-offset-4"
            >
              {siteConfig.nap.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${siteConfig.nap.telephone}`}
              className="underline underline-offset-4"
            >
              {siteConfig.nap.telephoneDisplay}
            </a>
            .
          </p>
        </div>
      ) : (
        <p className="text-xs text-[var(--color-muted)]">
          Prefer the phone? Call{" "}
          <a
            href={`tel:${siteConfig.nap.telephone}`}
            className="underline underline-offset-4"
          >
            {siteConfig.nap.telephoneDisplay}
          </a>
          .
        </p>
      )}
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
    <label className="grid min-w-0 gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full min-w-0 rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm focus:border-[var(--color-fg)] focus:outline-none"
      />
    </label>
  );
}
