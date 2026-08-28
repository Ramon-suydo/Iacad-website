import GuidelineForm from "../GuidelineForm";

export default function NewGuidelinePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-navy-950">New Guideline Section</h1>
      <div className="mt-6">
        <GuidelineForm />
      </div>
    </div>
  );
}