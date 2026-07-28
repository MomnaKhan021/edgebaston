"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../auth-actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="you@edgbastoncollege.co.uk"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue focus:ring-2 focus:ring-eb-blue/20"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-eb-blue focus:ring-2 focus:ring-eb-blue/20"
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
        className="w-full rounded-lg bg-eb-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-eb-navy-2 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
