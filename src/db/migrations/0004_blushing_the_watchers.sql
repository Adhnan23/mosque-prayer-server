CREATE TABLE `translations` (
	`language_code` text NOT NULL,
	`category` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	PRIMARY KEY(`language_code`, `category`, `key`),
	FOREIGN KEY (`language_code`) REFERENCES `languages`(`code`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "category_not_empty" CHECK(length("translations"."category") > 0),
	CONSTRAINT "key_not_empty" CHECK(length("translations"."key") > 0)
);
