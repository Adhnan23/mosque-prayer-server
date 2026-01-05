CREATE TABLE `languages` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	CONSTRAINT "code_length_check" CHECK(length("languages"."code") >= 2 AND length("languages"."code") <= 4),
	CONSTRAINT "name_not_empty" CHECK(length("languages"."name") > 0)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`mosque_name` text DEFAULT 'Masjidul Falah' NOT NULL,
	`language_code` text DEFAULT 'en' NOT NULL,
	`time_format` integer DEFAULT 24 NOT NULL,
	`is_ramadan` integer DEFAULT false NOT NULL,
	`primary_color` text DEFAULT '#000000' NOT NULL,
	`secondary_color` text DEFAULT '#ffffff' NOT NULL,
	`accent_color` text DEFAULT '#007bff' NOT NULL,
	`background_color` text DEFAULT '#f8f9fa' NOT NULL,
	`foreground_color` text DEFAULT '#212529' NOT NULL,
	FOREIGN KEY (`language_code`) REFERENCES `languages`(`code`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "settings_single_row" CHECK("settings"."id" = 1),
	CONSTRAINT "mosque_name_length" CHECK(length("settings"."mosque_name") > 0),
	CONSTRAINT "primary_hex" CHECK("settings"."primary_color" LIKE '#%'),
	CONSTRAINT "secondary_hex" CHECK("settings"."secondary_color" LIKE '#%'),
	CONSTRAINT "accent_hex" CHECK("settings"."accent_color" LIKE '#%'),
	CONSTRAINT "bg_hex" CHECK("settings"."background_color" LIKE '#%'),
	CONSTRAINT "fg_hex" CHECK("settings"."foreground_color" LIKE '#%')
);
