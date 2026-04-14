"use client";

import { AuthView } from "@neondatabase/auth/react/ui";

export default function SignUpPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <AuthView path="sign-up" />
    </section>
  );
}
