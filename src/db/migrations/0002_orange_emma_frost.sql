CREATE TABLE `notice` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`noticeContent` text NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`isActive` integer DEFAULT false NOT NULL
);
