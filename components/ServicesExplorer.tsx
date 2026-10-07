"use client";

import Link from "next/link";
import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import ServiceIllustration from "@/components/ServiceIllustration";
import { getServiceCategory, serviceCategories, type PublishedService } from "@/lib/service-categories";

export default function ServicesExplorer({ services, unavailable = false }: { services: PublishedService[]; unavailable?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const category = active === null ? null : serviceCategories[active];
  const items = category ? services.filter((service) => getServiceCategory(service) === category.id) : [];

  useLayoutEffect(() => {
    if (active === null) return;
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    // Batch page layout changes before the dialog's first visible frame.
    if (!element.open) element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
    };
  }, [active]);

  function closeDetails() {
    if (!closing) setClosing(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % serviceCategories.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + serviceCategories.length - 1) % serviceCategories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = serviceCategories.length - 1;
    else return;
    event.preventDefault();
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-navy-700/70">Choose a service to explore how we can help.</p>
        <span className="rounded-full border border-navy-900/10 bg-paper px-3 py-1.5 text-xs font-medium text-navy-700">Made for every way you learn</span>
      </div>

      <div role="group" aria-label="Library service categories" className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {serviceCategories.map((category, index) => (
          <button
            key={category.id}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            aria-haspopup="dialog"
            aria-controls={`${id}-details`}
            aria-expanded={active === index}
            onClick={() => { setClosing(false); setActive(index); }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`service-category group relative flex min-w-0 flex-col items-center rounded-2xl border bg-white p-3 text-center shadow-card transition-all duration-300 sm:p-5 ${active === index ? "border-cobalt-500 shadow-[0_16px_40px_-24px_rgba(59,91,255,.65)]" : "border-navy-900/10 hover:-translate-y-1 hover:border-cobalt-bright/40"}`}
          >
            <span aria-hidden="true" className={`absolute left-3 top-3 text-[10px] font-bold tracking-widest sm:left-5 sm:top-5 ${active === index ? "text-cobalt-500" : "text-navy-700/45"}`}>0{index + 1}</span>
            <span className={`service-hexagon mt-3 flex aspect-[1.05] min-h-36 w-full max-w-56 items-center justify-center px-4 py-9 font-display text-xs font-extrabold uppercase leading-snug tracking-tight text-white transition-colors duration-300 sm:px-5 sm:text-sm ${active === index ? "bg-cobalt-500" : "bg-navy-800 group-hover:bg-navy-700"}`}>
              {category.title}
            </span>
            <span className="mt-1 block h-24 w-full transition-transform duration-300 group-hover:-translate-y-1 sm:h-32">
              <ServiceIllustration category={category.id} />
            </span>
            <span aria-hidden="true" className={`mt-3 flex items-center gap-2 text-xs font-semibold sm:text-sm ${active === index ? "text-cobalt-500" : "text-navy-700/70"}`}>
              {active === index ? "Now exploring" : "Explore service"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${active === index ? "rotate-90" : "group-hover:translate-x-1"}`}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </span>
            <span aria-hidden="true" className={`absolute -bottom-1 h-1 w-12 rounded-full transition-colors ${active === index ? "bg-gold-500" : "bg-transparent"}`} />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        id={`${id}-details`}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        aria-modal="true"
        data-closing={closing}
        className="service-dialog fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto overscroll-contain rounded-3xl border border-white/70 bg-paper p-0 text-navy-950 shadow-[0_24px_64px_-24px_rgba(7,11,31,.45)]"
        onCancel={(event) => { event.preventDefault(); closeDetails(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={() => { setActive(null); setClosing(false); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDetails();
        }}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && closing) dialog.current?.close();
        }}
      >
        {category && (
          <>
            <div aria-hidden="true" className="brand-rail sticky top-0 z-10" />
            <button ref={closeButton} type="button" onClick={closeDetails} aria-label="Close service details" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-700 shadow-sm transition hover:rotate-90 hover:bg-navy-950 hover:text-white sm:right-6 sm:top-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
            <div className="p-6 pt-16 sm:p-9 sm:pt-16 lg:p-10 lg:pt-16">
              <div className="service-dialog-intro mb-7 grid items-center gap-6 border-b border-navy-900/10 pb-7 sm:grid-cols-[1fr_160px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-cobalt-500">Service 0{active! + 1} / 04</p>
                  <h2 id={`${id}-title`} className="mt-3 text-2xl font-extrabold text-navy-950 sm:text-3xl">{category.title}</h2>
                  <p className="mt-3 text-base font-semibold text-navy-950">{category.shortTitle}</p>
                  <p id={`${id}-description`} className="mt-3 text-sm leading-relaxed text-navy-700/75">{category.description}</p>
                </div>
                <div className="hidden h-28 sm:block"><ServiceIllustration category={category.id} /></div>
              </div>
              <div className="service-dialog-items grid gap-3 sm:grid-cols-2">
                {items.length > 0 ? items.map((service) => (
                  <article key={service.id} className="service-dialog-item index-card rounded-xl border border-navy-900/8 bg-white p-5 shadow-card">
                    <h3 className="text-base font-extrabold text-navy-950">{service.name}</h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-navy-700/70">{service.description}</p>
                  </article>
                )) : (
                  <div className="rounded-xl border border-navy-900/8 bg-white p-6 sm:col-span-2">
                    <p className="text-base font-semibold text-navy-950">Let’s find what you need.</p>
                    <p className="mt-2 text-sm leading-relaxed text-navy-700/70">{unavailable ? "Service details are temporarily unavailable. Our librarians can help with your request." : "Explore the linked page for more information, or talk to our librarians about your needs."}</p>
                    <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-cobalt-500 underline decoration-cobalt-500/30 underline-offset-4 hover:text-navy-950">Contact the library</Link>
                  </div>
                )}
              </div>
              <div className="service-dialog-footer mt-7 flex flex-wrap items-center justify-between gap-4">
                <Link href={category.href} className="inline-flex items-center gap-3 rounded-md bg-navy-950 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800">
                  {category.linkLabel}<span aria-hidden="true">↗</span>
                </Link>
                <button type="button" onClick={closeDetails} className="rounded-md px-3 py-2 text-sm font-semibold text-navy-700/70 hover:bg-navy-900/5 hover:text-navy-950">Back to services</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
