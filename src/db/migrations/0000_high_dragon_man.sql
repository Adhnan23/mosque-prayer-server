CREATE TABLE `calendar_date` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `month` integer NOT NULL,
    `day` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ikamah_delay` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `fajr` integer NOT NULL,
    `jummah` integer NOT NULL,
    `dhuhr` integer NOT NULL,
    `asr` integer NOT NULL,
    `maghrib` integer NOT NULL,
    `isha` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prayer_time` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `date_id` integer NOT NULL,
    `fajr` text NOT NULL,
    `sunrise` text NOT NULL,
    `dhuhr` text NOT NULL,
    `asr` text NOT NULL,
    `maghrib` text NOT NULL,
    `isha` text NOT NULL,
    FOREIGN KEY (`date_id`) REFERENCES `calendar_date` (`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ramadan` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `suhur` text NOT NULL,
    `sunset` text NOT NULL,
    `taraweeh` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name` text NOT NULL,
    `value` text NOT NULL
);