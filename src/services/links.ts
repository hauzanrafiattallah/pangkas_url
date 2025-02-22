"use server";

import { db } from "@/db";
import { LinkInsertType, linksTable, LinkType } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { createTempUserId, getUserId } from "./users";

const isSlugExist = async (slug: string) => {
  const result = await db.query.linksTable.findFirst({
    where: eq(linksTable.slug, slug),
  });
  if (result) {
    return true;
  }
  return false;
};

const generateSlug = async (): Promise<string> => {
  const generatedSlug = nanoid(6);
  const isExist = await isSlugExist(generatedSlug);
  if (isExist) {
    return await generateSlug();
  }
  return generatedSlug;
};

export const createSimpleLink = async (link: string) => {
  const slug = await generateSlug();
  const userId = (await getUserId()) ?? (await createTempUserId());
  const param = {
    userId: userId,
    slug,
    link,
  } satisfies LinkInsertType;
  await createLink(param);
};

export const createLink = async (param: LinkInsertType) => {
  await db.insert(linksTable).values(param);
};

export const getLinksByUserId = async (userId: string): Promise<LinkType[]> => {
  const results = await db.query.linksTable.findMany({
    where: eq(linksTable.userId, userId),
    orderBy: [desc(linksTable.createdAt)],
  });
  return results;
};
