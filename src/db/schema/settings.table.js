import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

const settingsTable = sqliteTable("settings", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  value: text("value").notNull(),
});

const Settings = {
  table: settingsTable,
  schema: {
    select: createSelectSchema(settingsTable).strict(),
    insert: createInsertSchema(settingsTable).strict(),
    update: createUpdateSchema(settingsTable).partial().strict(),
  },
};

export { Settings, settingsTable };
