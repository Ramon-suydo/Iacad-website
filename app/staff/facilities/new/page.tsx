import FacilityForm from "../FacilityForm";

export default function NewFacilityPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Facility</h1>
      <div className="mt-6">
        <FacilityForm />
      </div>
    </div>
  );
}