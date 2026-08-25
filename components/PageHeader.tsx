import Container from "./Container";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="relative">
        {eyebrow && (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl font-serif text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}