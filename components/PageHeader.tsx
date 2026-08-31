import Container from "./Container";

export default function PageHeader({
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute -top-32 right-[8%] h-80 w-80 rounded-full bg-cobalt-bright/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="absolute right-0 top-1/2 hidden h-px w-[30vw] bg-gradient-to-l from-pop-cyan/40 via-cobalt-bright/20 to-transparent lg:block" />

      <Container className="relative">
        <div className="flex items-start">
          <div className="border-l-2 border-cobalt-bright/70 pl-4 sm:pl-6">
            <h1 className="max-w-3xl text-3xl font-black leading-[1.06] tracking-[-0.045em] text-white min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
      <div className="brand-rail absolute inset-x-0 bottom-0" />
    </section>
  );
}
