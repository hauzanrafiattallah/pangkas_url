import SimpleLinkForm from "@/components/links/simple-link-form";

export default function Home() {
  return (
    <main className="flex flex-col w-full mx-auto px-4 items-center py-24">
      <section className="flex flex-col gap-4 items-center">
        <h1 className="font-extrabold text-5xl md:text-6xl">Pangkas URL</h1>
        <p className="font-semibold text-base md:text-xl text-foreground/70">
          Pemangkas URL menjadi lebih singkat
        </p>
      </section>
      <SimpleLinkForm />
    </main>
  );
}
