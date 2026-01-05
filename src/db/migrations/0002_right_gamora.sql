CREATE TABLE `ikamah_delay` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fajir` integer NOT NULL,
	`jummah` integer NOT NULL,
	`dhuar` integer NOT NULL,
	`asar` integer NOT NULL,
	`magrib` integer NOT NULL,
	`isha` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ramadan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`suhur` text NOT NULL,
	`sunset` text NOT NULL,
	`taraweeh` text NOT NULL
);
