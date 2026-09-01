"use client";

import Image from "next/image";
import { saveAboutContent } from "./actions";
import { getLibraryStaff, type LibraryStaffMember } from "@/lib/about-team";

type AboutContent = {
  id: string;
  introduction: string;
  mission: string;
  vision: string;
  goals: string[];
  staff_members?: LibraryStaffMember[];
};

export default function AboutForm({ content }: { content: AboutContent }) {
  const staffMembers = getLibraryStaff(content.staff_members);

  return (
    <form action={saveAboutContent} className="max-w-3xl space-y-8">
      <input type="hidden" name="id" value={content.id} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Introduction</label>
        <textarea
          name="introduction"
          required
          rows={12}
          defaultValue={content.introduction}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">Leave a blank line between paragraphs.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Mission</label>
        <textarea
          name="mission"
          required
          rows={4}
          defaultValue={content.mission}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Vision</label>
        <textarea
          name="vision"
          required
          rows={3}
          defaultValue={content.vision}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-950">Goals & Objectives</label>
        <textarea
          name="goals"
          required
          rows={12}
          defaultValue={content.goals?.join("\n")}
          className="w-full rounded-md border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-gold-500"
        />
        <p className="mt-1 text-xs text-navy-700/50">One goal per line.</p>
      </div>

      <section className="border-t border-navy-900/10 pt-8">
        <h2 className="text-lg font-extrabold text-navy-950">Library Staff</h2>
        <p className="mt-1 text-xs text-navy-700/50">Edit the names, titles, and optional descriptions shown with the staff portraits.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {staffMembers.map((member, index) => (
            <div key={member.image_url} className="rounded-xl border border-navy-900/10 bg-white p-5">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-navy-900">
                <Image src={member.image_url} alt="" fill sizes="(min-width: 640px) 340px, calc(100vw - 4rem)" className="object-cover object-top" />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-950">Name</label>
                  <input name={`staff_name_${index}`} required defaultValue={member.name}
                    className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-950">Title</label>
                  <input name={`staff_title_${index}`} required defaultValue={member.title}
                    className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-950">Description <span className="font-normal text-navy-700/50">(optional)</span></label>
                  <textarea name={`staff_description_${index}`} rows={4} defaultValue={member.description}
                    className="w-full border border-navy-900/15 px-3 py-2 text-sm outline-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="submit"
        className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400"
      >
        Save
      </button>
    </form>
  );
}
