"use client";

import { AuthView } from "@neondatabase/auth/react/ui";

export default function SignOutPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <AuthView path="sign-out" />
    </section>
  );
}