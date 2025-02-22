import { LinkList } from "@/components/links/link-list";
import SimpleLinkForm from "@/components/links/simple-link-form";
import { getBaseURL } from "@/services/config";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
  const baseUrl = await getBaseURL();
  return (
    <main className="flex flex-col w-full mx-auto px-4 items-center py-24">
      <section className="flex flex-col gap-4 items-center">
        <h1 className="font-extrabold text-5xl md:text-6xl">Pangkas URL</h1>
        <p className="font-semibold text-base md:text-xl text-foreground/70">
          Pemangkas URL menjadi lebih singkat
        </p>
      </section>
      <SimpleLinkForm />
      <Suspense fallback={<Loader2 className="animate-spin mt-8" />}>
        <LinkList baseUrl={baseUrl} />
      </Suspense>
    </main>
  );
}
