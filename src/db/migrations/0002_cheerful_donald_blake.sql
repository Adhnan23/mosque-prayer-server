CREATE TABLE `ramadan` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`suhur_end` text DEFAULT '04:30' NOT NULL,
	`taraweeh` text DEFAULT '20:00' NOT NULL,
	CONSTRAINT "ramadan_single_row" CHECK("ramadan"."id" = 1),
	CONSTRAINT "suhur_format" CHECK("ramadan"."suhur_end" LIKE '__:__'),
	CONSTRAINT "taraweeh_format" CHECK("ramadan"."taraweeh" LIKE '__:__')
);
