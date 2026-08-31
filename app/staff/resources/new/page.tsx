import ResourceForm from "../ResourceForm";

export default function NewResourcePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">New Resource Category</h1>
      <div className="mt-6">
        <ResourceForm />
      </div>
    </div>
  );
}
