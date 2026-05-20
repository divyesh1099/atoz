"use client";

import { startTransition, useMemo, useState } from "react";
import { Clipboard, Mail, MessageCircle, SendHorizonal } from "lucide-react";
import { useSearchParams } from "next/navigation";

import type { Service } from "@/content/services";
import type { BusinessInfo } from "@/content/site";
import {
  buildBookingMessage,
  mailtoUrl,
  type BookingRequest,
  type BookingMessageCopy,
  whatsappUrl,
} from "@/lib/site";

type BookingDraft = {
  message: string;
  whatsappHref: string;
  emailHref: string;
};

const fieldClassName =
  "field-control";

type BookingFormProps = {
  business: BusinessInfo;
  services: Service[];
  copy: {
    title: string;
    description: string;
    requiredError: string;
    fields: {
      fullName: string;
      phone: string;
      email: string;
      service: string;
      device: string;
      location: string;
      preferredTime: string;
      preferredContactMethod: string;
      issueDetails: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      device: string;
      location: string;
      preferredTime: string;
      issueDetails: string;
    };
    contactMethods: {
      whatsapp: string;
      phone: string;
      email: string;
    };
    actions: {
      sendOnWhatsApp: string;
      emailRequest: string;
      copyRequest: string;
      copied: string;
    };
    selectedService: {
      eyebrow: string;
      emptyTitle: string;
      emptyCopy: string;
    };
    nextStep: {
      eyebrow: string;
      copy: string;
    };
    messageTemplate: BookingMessageCopy;
  };
  initialService?: string;
};

export function BookingForm({
  business,
  services,
  copy,
  initialService,
}: BookingFormProps) {
  const searchParams = useSearchParams();
  const serviceFromQuery = searchParams.get("service");
  const defaultService =
    initialService || serviceFromQuery || services[0]?.slug || "";

  const [form, setForm] = useState<BookingRequest>({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    device: "",
    location: "",
    preferredTime: "",
    contactMethod: copy.contactMethods.whatsapp,
    message: "",
  });
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedService = useMemo(
    () => services.find((service) => service.slug === form.service),
    [form.service, services],
  );

  function setField<K extends keyof BookingRequest>(
    field: K,
    value: BookingRequest[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.service.trim()) {
      setError(copy.requiredError);
      return;
    }

    setError("");
    setCopied(false);

    const localizedMessage = buildBookingMessage(form, {
      businessName: business.name,
      serviceTitle: selectedService?.title,
      copy: copy.messageTemplate,
    });
    const nextDraft = {
      message: localizedMessage,
      whatsappHref: whatsappUrl(business, localizedMessage),
      emailHref: mailtoUrl(
        business,
        `Service request: ${selectedService?.title || business.name}`,
        localizedMessage,
      ),
    };

    startTransition(() => {
      setDraft(nextDraft);
    });

    if (typeof window !== "undefined") {
      window.open(nextDraft.whatsappHref, "_blank", "noopener,noreferrer");
    }
  }

  async function copyDraft() {
    if (!draft || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(draft.message);
    setCopied(true);
  }

  return (
    <div className="surface-card rounded-[2rem] p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-slate-950">
          {copy.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          {copy.description}
        </p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.fullName}
            <input
              className={fieldClassName}
              name="name"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              placeholder={copy.placeholders.name}
              autoComplete="name"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.phone}
            <input
              className={fieldClassName}
              name="phone"
              value={form.phone}
              onChange={(event) => setField("phone", event.target.value)}
              placeholder={copy.placeholders.phone}
              autoComplete="tel"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.email}
            <input
              className={fieldClassName}
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              placeholder={copy.placeholders.email}
              autoComplete="email"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.service}
            <select
              className={fieldClassName}
              name="service"
              value={form.service}
              onChange={(event) => setField("service", event.target.value)}
            >
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.device}
            <input
              className={fieldClassName}
              name="device"
              value={form.device}
              onChange={(event) => setField("device", event.target.value)}
              placeholder={copy.placeholders.device}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.location}
            <input
              className={fieldClassName}
              name="location"
              value={form.location}
              onChange={(event) => setField("location", event.target.value)}
              placeholder={copy.placeholders.location}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.preferredTime}
            <input
              className={fieldClassName}
              name="preferredTime"
              value={form.preferredTime}
              onChange={(event) => setField("preferredTime", event.target.value)}
              placeholder={copy.placeholders.preferredTime}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            {copy.fields.preferredContactMethod}
            <select
              className={fieldClassName}
              name="contactMethod"
              value={form.contactMethod}
              onChange={(event) => setField("contactMethod", event.target.value)}
            >
              <option>{copy.contactMethods.whatsapp}</option>
              <option>{copy.contactMethods.phone}</option>
              <option>{copy.contactMethods.email}</option>
            </select>
          </label>
        </div>

        <label className="text-sm font-semibold text-slate-700">
          {copy.fields.issueDetails}
          <textarea
            className={`${fieldClassName} min-h-36 resize-y`}
            name="message"
            value={form.message}
            onChange={(event) => setField("message", event.target.value)}
            placeholder={copy.placeholders.issueDetails}
          />
        </label>

        {error ? (
          <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="btn-primary">
            <SendHorizonal className="h-4 w-4" />
            {copy.actions.sendOnWhatsApp}
          </button>
          {draft ? (
            <>
              <a className="btn-secondary" href={draft.emailHref}>
                <Mail className="h-4 w-4" />
                {copy.actions.emailRequest}
              </a>
              <button type="button" className="btn-ghost" onClick={copyDraft}>
                <Clipboard className="h-4 w-4" />
                {copied ? copy.actions.copied : copy.actions.copyRequest}
              </button>
            </>
          ) : null}
        </div>
      </form>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="info-tile px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            {copy.selectedService.eyebrow}
          </p>
          <h3 className="font-display mt-3 text-xl font-semibold text-slate-950">
            {selectedService?.title || copy.selectedService.emptyTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {selectedService?.summary ||
              copy.selectedService.emptyCopy}
          </p>
        </div>

        <div className="info-tile px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            {copy.nextStep.eyebrow}
          </p>
          <div className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-600">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <p>{copy.nextStep.copy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
