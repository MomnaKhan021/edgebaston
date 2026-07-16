"use client";

import { useFormStatus } from "react-dom";

function Inner({ label, confirm }: { label: string; confirm: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}

/**
 * A delete control that wraps a Server Action in a form and asks for
 * confirmation before submitting.
 */
export function DeleteButton({
  action,
  id,
  label = "Delete",
  confirm = "Are you sure you want to delete this? This cannot be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
  confirm?: string;
}) {
  return (
    <form action={action} className="inline">
      <input type="hidden" name="id" value={id} />
      <Inner label={label} confirm={confirm} />
    </form>
  );
}
