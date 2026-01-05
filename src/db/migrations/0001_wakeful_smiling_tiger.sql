CREATE TABLE `prayer_time` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date_id` integer,
	`fajir` text NOT NULL,
	`sunrise` text NOT NULL,
	`dhuar` text NOT NULL,
	`asar` text NOT NULL,
	`magrib` text NOT NULL,
	`isha` text NOT NULL,
	FOREIGN KEY (`date_id`) REFERENCES `calendar_date`(`id`) ON UPDATE no action ON DELETE no action
);
