import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="relative text-center">
        <span className="font-serif text-7xl font-semibold text-gold-400 sm:text-8xl">
          404
        </span>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
          This page couldn&apos;t be found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          The page you&apos;re looking for may have been moved or doesn&apos;t
          exist. Let&apos;s get you back to the library.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}