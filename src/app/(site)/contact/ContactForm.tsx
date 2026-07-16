"use client";

import { useActionState } from "react";
import { submitInquiry, type ContactState } from "./actions";

const initialState: ContactState = {};

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-bold text-green-800">Thank you!</h3>
        <p className="mt-1 text-sm text-green-700">
          Your enquiry has been received. Our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full name *
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone
          </label>
          <input id="phone" name="phone" className={inputClass} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="e.g. Course enquiry"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
