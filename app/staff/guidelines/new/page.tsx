import GuidelineForm from "../GuidelineForm";

export default function NewGuidelinePage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-navy-950">New Guideline Section</h1>
      <div className="mt-6">
        <GuidelineForm />
      </div>
    </div>
  );
}
