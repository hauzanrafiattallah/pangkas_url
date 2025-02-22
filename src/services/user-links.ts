import { LinkType } from "@/db/schema";
import { getUserId } from "@/services/users";
import { getLinksByUserId } from "./links";

export const getUserLinks = async (): Promise<LinkType[]> => {
  const userId = await getUserId();
  return await getLinksByUserId(userId ?? "");
};
