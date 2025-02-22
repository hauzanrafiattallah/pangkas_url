import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const linksTable = sqliteTable("links", {
  id: integer("id").primaryKey(),
  link: text("link").notNull(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull(),
  visitCount: integer("visit_count").default(0).notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

export type LinkInsertType = typeof linksTable.$inferInsert;
export type LinkType = typeof linksTable.$inferSelect;
