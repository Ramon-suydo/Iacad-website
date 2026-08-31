import type { Metadata } from "next";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = { title: "Account" };

export default function StaffAccountPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">Account</h1>
      <p className="mt-1 text-sm text-navy-700/60">Manage the password used to access your staff account.</p>
      <div className="mt-8">
        <PasswordForm />
      </div>
    </div>
  );
}
