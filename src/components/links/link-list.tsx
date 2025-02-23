import { getUserLinks } from "@/services/user-links";
import { LinkCard } from "./link-card";

type Props = {
  baseUrl: string;
};

export const LinkList = async ({ baseUrl }: Props) => {
  const links = await getUserLinks();
  return (
    <section className="mt-8 w-full max-w-[32rem] space-y-2">
      <h2 className="font-semibold text-2xl ">Recents</h2>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} baseUrl={baseUrl} />
      ))}
    </section>
  );
};
