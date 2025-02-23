"use server";

import { db } from "@/db";
import { LinkInsertType, linksTable, LinkType } from "@/db/schema";
import { and, desc, eq, param } from "drizzle-orm";
import { nanoid } from "nanoid";
import { createTempUserId, getUserId } from "./users";
import { revalidatePath } from "next/cache";

const getUserIdOrCreateTemp = async (): Promise<string> => {
  const userId = await getUserId();
  if (userId) return userId;
  return await createTempUserId();
};

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
  const userId = await getUserIdOrCreateTemp();
  const param = {
    userId: userId,
    slug,
    link,
  } satisfies LinkInsertType;
  await createLink(param);
};

export const createLink = async (param: LinkInsertType) => {
  await db.insert(linksTable).values(param);
  revalidatePath("/");
};

export const getLinksByUserId = async (userId: string): Promise<LinkType[]> => {
  const results = await db.query.linksTable.findMany({
    where: eq(linksTable.userId, userId),
    orderBy: [desc(linksTable.createdAt)],
  });
  return results;
};

export const createLinkWithSlug = async (link: string, slug: string) => {
  const userId = await getUserIdOrCreateTemp();
  let paramSlug = slug;
  if (!paramSlug) {
    paramSlug = await generateSlug();
  }
  if (await isSlugExist(paramSlug)) throw Error("Slug Exists");
  await db.insert(linksTable).values({ userId, link, slug: paramSlug });
  revalidatePath("/");
};

export const updateLinkById = async (
  id: number,
  link: string,
  slug: string
) => {
  const userId = await getUserIdOrCreateTemp();
  const existing = await db.query.linksTable.findFirst({
    where: and(eq(linksTable.id, id), eq(linksTable.userId, userId)),
  });
  if (!existing) throw Error("Unauthorized");
  if ((await isSlugExist(slug)) && slug !== existing.slug)
    throw Error("Slug Exists");
  await db
    .update(linksTable)
    .set({ link: link, slug: slug })
    .where(and(eq(linksTable.id, id), eq(linksTable.userId, userId)));
  revalidatePath("/");
};
