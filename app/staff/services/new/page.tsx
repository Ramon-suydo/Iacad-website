import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Service</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}