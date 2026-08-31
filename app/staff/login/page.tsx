"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function StaffLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push("/staff/announcements");
    router.refresh();
  }

  return (
    <div className="staff-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 py-8 sm:px-6">
      <div className="dot-grid absolute inset-0 opacity-20" />
      <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-cobalt-bright/10 blur-3xl" />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white p-6 shadow-[0_28px_70px_-30px_rgba(0,0,0,.8)] sm:p-8">
        <Image
          src="/images/library/facilities/iAcademyLogo%20(3).png"
          alt="iACADEMY Makati"
          width={1920}
          height={615}
          className="mb-7 h-12 w-auto max-w-[230px] object-contain object-left"
          priority
        />
        <h1 className="text-2xl font-extrabold tracking-[-.025em] text-navy-950">
          Staff Sign In
        </h1>
        <p className="mt-1 text-sm text-navy-700/60">
          iACADEMY Library content management
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-950">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold-500 px-4 py-3 text-sm font-bold text-navy-950 shadow-[0_10px_24px_-12px_rgba(212,175,55,.8)] hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
