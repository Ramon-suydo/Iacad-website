"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function StaffToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const type = params.get("notice");
  const messages: Record<string, string> = {
    saved: "Changes saved successfully.",
    requested: "Your changes were submitted for approval.",
    approved: "Request approved and published successfully.",
    rejected: "Request rejected. The live website was not changed.",
  };
  const message = type ? messages[type] : null;

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => router.replace(pathname, { scroll: false }), 4500);
    return () => window.clearTimeout(timer);
  }, [message, pathname, router]);

  if (!message) return null;

  return (
    <div role="status" aria-live="polite" className="fixed bottom-5 right-4 z-[100] flex max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-cobalt-500/20 bg-white px-4 py-3 text-sm text-navy-950 shadow-[0_20px_50px_-20px_rgba(7,11,31,.55)] sm:right-6">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cobalt-500 text-xs font-bold text-white">✓</span>
      <span className="font-medium">{message}</span>
      <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="ml-2 text-navy-700/45 hover:text-navy-950" aria-label="Dismiss notification">×</button>
    </div>
  );
}
