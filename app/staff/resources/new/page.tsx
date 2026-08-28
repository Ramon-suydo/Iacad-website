import ResourceForm from "../ResourceForm";

export default function NewResourcePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Resource Category</h1>
      <div className="mt-6">
        <ResourceForm />
      </div>
    </div>
  );
}