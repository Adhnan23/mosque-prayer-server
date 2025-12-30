CREATE TABLE `language` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `translation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lang_code` text NOT NULL,
	`category` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`lang_code`) REFERENCES `language`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translation_unique` ON `translation` (`lang_code`,`category`,`key`);