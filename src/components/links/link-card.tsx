"use client";

import { LinkType } from "@/db/schema";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { CopyButton } from "../ui/copy-button";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { LinkCardActions } from "./link-card-actions";

type Props = {
  link: LinkType;
  baseUrl: string;
};

export const LinkCard = ({ link, baseUrl }: Props) => {
  const favicon = useMemo(() => {
    const url = new URL(decodeURI(link.link));
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${url.hostname}`;
  }, [link]);

  const shortenedUrl = useMemo(() => {
    return `${baseUrl}/${link.slug}`;
  }, [link, baseUrl]);
  const date = useMemo(() => {
    const createdAt = new Date(link.createdAt);
    return createdAt.toLocaleString();
  }, [link]);

  return (
    <Card className="flex p-3 gap-3">
      <Image
        src={favicon}
        alt={link.link}
        width={32}
        height={32}
        className="rounded-full size-8"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={shortenedUrl}
            className="text-lg font-semibold leading-none break-all"
          >
            {shortenedUrl.split("://")[1]}
          </a>
          <div className="flex gap-2">
            <CopyButton
              textToCopy={shortenedUrl}
              onCopied={() => toast("Link berhasil disalin ke clipboard")}
            />
            <div className="flex text-xs gap-1 items-center">
              <Eye className="size-4" />
              <span>{link.visitCount} visits</span>
            </div>
          </div>
        </div>
        <Link
          href={link.link}
          className="text-sm font-semibold text-foreground/80 mt-2"
        >
          {link.link}
        </Link>
        <div className="text-xs">{date}</div>
      </div>
      <LinkCardActions link={link} />
    </Card>
  );
};
