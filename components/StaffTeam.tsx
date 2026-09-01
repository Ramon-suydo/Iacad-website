"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LibraryStaffMember } from "@/lib/about-team";

const MODAL_EXIT_MS = 180;

function getImageClass(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("iris")) return "staff-card-image staff-card-image-iris";
  if (lower.includes("jhoana")) return "staff-card-image staff-card-image-jhoana";
  if (lower.includes("yendy")) return "staff-card-image staff-card-image-yendy";
  return "staff-card-image";
}

function getModalImageClass(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("iris")) return "staff-card-image staff-modal-image-iris";
  if (lower.includes("jhoana")) return "staff-card-image staff-modal-image-jhoana";
  if (lower.includes("yendy")) return "staff-card-image staff-modal-image-yendy";
  return "staff-card-image";
}
function getAccentClass(title: string) {
  return title.toLowerCase().includes("chief")
    ? "from-gold-400 via-gold-500 to-gold-600"
    : "from-pop-cyan via-cobalt-bright to-cobalt-500";
}

export default function StaffTeam({ members }: { members: LibraryStaffMember[] }) {
  const [selected, setSelected] = useState<LibraryStaffMember | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeProfile = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, MODAL_EXIT_MS);
  }, []);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProfile();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeProfile, selected]);

  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const accentClass = getAccentClass(member.title);

          return (
            <article
              key={member.image_url}
              className="index-card group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-cobalt-bright/25 hover:shadow-[0_28px_60px_-32px_rgba(7,11,31,.5)]"
            >
              <div className="staff-card-photo bg-navy-900">
                <Image
                  src={member.image_url}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                  className={getImageClass(member.name)}
                />
                <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accentClass}`} />
              </div>
              <div className="flex min-h-36 flex-1 flex-col px-6 py-6">
                <p className="text-[11px] font-extrabold uppercase leading-none tracking-[.16em] text-cobalt-500">
                  {member.title}
                </p>
                <h3 className="mt-3 text-[1.35rem] font-extrabold leading-tight text-navy-950">
                  {member.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelected(member)}
                  className="mt-auto inline-flex w-fit items-center pt-6 text-xs font-extrabold uppercase tracking-[.12em] text-cobalt-500 outline-offset-4 hover:text-navy-950 focus-visible:outline-gold-500"
                  aria-label={`View profile for ${member.name}`}
                >
                  View profile
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selected && createPortal(
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/75 p-4 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onMouseDown={closeProfile}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-profile-title"
            className={`relative max-h-[90dvh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/15 bg-white shadow-[0_30px_90px_-30px_rgba(7,11,31,.8)] transition-[opacity,transform] duration-200 ease-out ${
              isClosing ? "scale-[.96] opacity-0" : "scale-100 opacity-100"
            }`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProfile}
              aria-label="Close staff profile"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/80 text-xl leading-none text-white shadow-lg backdrop-blur transition hover:bg-cobalt-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              &times;
            </button>
            <div className="grid sm:grid-cols-[240px_1fr]">
              <div className="staff-modal-photo bg-navy-900">
                <Image
                  src={selected.image_url}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 240px, calc(100vw - 2rem)"
                  className={getModalImageClass(selected.name)}
                />
                <div className={`absolute inset-y-0 right-0 hidden w-1 bg-gradient-to-b ${getAccentClass(selected.title)} sm:block`} />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-8">
                <p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-cobalt-500">{selected.title}</p>
                <h2 id="staff-profile-title" className="mt-2 text-2xl font-extrabold leading-tight text-navy-950">{selected.name}</h2>
                <div className="mt-5 h-0.5 w-12 bg-gold-500" />
                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-navy-700/80">
                  {selected.description || "More profile information will be added soon."}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}