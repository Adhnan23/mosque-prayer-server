CREATE TABLE `prayer_times` (
	`month` integer NOT NULL,
	`day` integer NOT NULL,
	`fajr` text NOT NULL,
	`sunrise` text NOT NULL,
	`dhuhr` text NOT NULL,
	`asr` text NOT NULL,
	`maghrib` text NOT NULL,
	`isha` text NOT NULL,
	PRIMARY KEY(`month`, `day`),
	CONSTRAINT "fajr_format" CHECK("prayer_times"."fajr" LIKE '__:__'),
	CONSTRAINT "sunrise_format" CHECK("prayer_times"."sunrise" LIKE '__:__'),
	CONSTRAINT "dhuhr_format" CHECK("prayer_times"."dhuhr" LIKE '__:__'),
	CONSTRAINT "asr_format" CHECK("prayer_times"."asr" LIKE '__:__'),
	CONSTRAINT "maghrib_format" CHECK("prayer_times"."maghrib" LIKE '__:__'),
	CONSTRAINT "isha_format" CHECK("prayer_times"."isha" LIKE '__:__')
);
