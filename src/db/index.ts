import { drizzle } from "drizzle-orm/libsql";
import { linksTable } from "./schema";

export const db = drizzle({
  schema: {
    linksTable,
  },
  connection: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
