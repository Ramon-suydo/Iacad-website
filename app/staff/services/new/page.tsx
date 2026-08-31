import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">New Service</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}
