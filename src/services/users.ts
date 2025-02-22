"use server";

import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

const KEY_TEMP_USER_ID = "pangakas-temp-user-id";

export const createTempUserId = async (): Promise<string> => {
  const cookiesStore = await cookies();
  const tempUserId = nanoid();
  cookiesStore.set(KEY_TEMP_USER_ID, tempUserId);
  return tempUserId;
};

export const getUserId = async (): Promise<string | null> => {
  const user = await currentUser();
  if (user) {
    return user.id;
  }
  const cookiesStore = await cookies();
  return cookiesStore.get(KEY_TEMP_USER_ID)?.value ?? null;
};
