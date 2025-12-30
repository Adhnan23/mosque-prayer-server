PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notice` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`noticeContent` text NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`isActive` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_notice`("id", "noticeContent", "startDate", "endDate", "isActive") SELECT "id", "noticeContent", "startDate", "endDate", "isActive" FROM `notice`;--> statement-breakpoint
DROP TABLE `notice`;--> statement-breakpoint
ALTER TABLE `__new_notice` RENAME TO `notice`;--> statement-breakpoint
PRAGMA foreign_keys=ON;