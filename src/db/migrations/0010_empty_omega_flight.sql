PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ikamah` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`fajr` integer DEFAULT 30 NOT NULL,
	`dhuhr` integer DEFAULT 10 NOT NULL,
	`asr` integer DEFAULT 10 NOT NULL,
	`maghrib` integer DEFAULT 10 NOT NULL,
	`isha` integer DEFAULT 10 NOT NULL,
	`jummah` integer DEFAULT 10 NOT NULL,
	CONSTRAINT "single_row_check" CHECK("__new_ikamah"."id" = 1),
	CONSTRAINT "fajr_range" CHECK("__new_ikamah"."fajr" BETWEEN 0 AND 90),
	CONSTRAINT "dhuhr_range" CHECK("__new_ikamah"."dhuhr" BETWEEN 0 AND 90),
	CONSTRAINT "asr_range" CHECK("__new_ikamah"."asr" BETWEEN 0 AND 90),
	CONSTRAINT "maghrib_range" CHECK("__new_ikamah"."maghrib" BETWEEN 0 AND 90),
	CONSTRAINT "isha_range" CHECK("__new_ikamah"."isha" BETWEEN 0 AND 90),
	CONSTRAINT "jummah_range" CHECK("__new_ikamah"."jummah" BETWEEN 0 AND 90)
);
--> statement-breakpoint
INSERT INTO `__new_ikamah`("id", "fajr", "dhuhr", "asr", "maghrib", "isha", "jummah") SELECT "id", "fajr", "dhuhr", "asr", "maghrib", "isha", "jummah" FROM `ikamah`;--> statement-breakpoint
DROP TABLE `ikamah`;--> statement-breakpoint
ALTER TABLE `__new_ikamah` RENAME TO `ikamah`;--> statement-breakpoint
PRAGMA foreign_keys=ON;