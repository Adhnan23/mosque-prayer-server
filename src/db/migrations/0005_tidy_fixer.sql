CREATE TABLE `notices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`language_code` text NOT NULL,
	`content` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`language_code`) REFERENCES `languages`(`code`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "date_logic" CHECK("notices"."start_date" <= "notices"."end_date"),
	CONSTRAINT "content_not_empty" CHECK(length("notices"."content") > 0)
);
