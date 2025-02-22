CREATE TABLE `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`link` text NOT NULL,
	`slug` text NOT NULL,
	`user_id` text NOT NULL,
	`visit_count` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `links_slug_unique` ON `links` (`slug`);