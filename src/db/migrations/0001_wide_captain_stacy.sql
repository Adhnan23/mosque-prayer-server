CREATE TABLE `ikamah` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`fajr` integer DEFAULT 15 NOT NULL,
	`dhuhr` integer DEFAULT 15 NOT NULL,
	`asr` integer DEFAULT 15 NOT NULL,
	`maghrib` integer DEFAULT 5 NOT NULL,
	`isha` integer DEFAULT 15 NOT NULL,
	`jummah` integer DEFAULT 0 NOT NULL,
	CONSTRAINT "single_row_check" CHECK("ikamah"."id" = 1),
	CONSTRAINT "fajr_range" CHECK("ikamah"."fajr" BETWEEN 0 AND 90),
	CONSTRAINT "dhuhr_range" CHECK("ikamah"."dhuhr" BETWEEN 0 AND 90),
	CONSTRAINT "asr_range" CHECK("ikamah"."asr" BETWEEN 0 AND 90),
	CONSTRAINT "maghrib_range" CHECK("ikamah"."maghrib" BETWEEN 0 AND 90),
	CONSTRAINT "isha_range" CHECK("ikamah"."isha" BETWEEN 0 AND 90),
	CONSTRAINT "jummah_range" CHECK("ikamah"."jummah" BETWEEN 0 AND 90)
);
