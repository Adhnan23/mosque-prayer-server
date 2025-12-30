import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

const settingsTable = sqliteTable(
  "settings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    value: text("value").notNull(),
  },
  (table) => ({
    uniqueName: uniqueIndex("settings_name_unique").on(table.name),
  })
);

const Settings = {
  table: settingsTable,
  schema: {
    select: createSelectSchema(settingsTable, {
      id: z.number().int().positive(),
    }).strict(),
    update: createUpdateSchema(settingsTable)
      .omit({ id: true })
      .partial()
      .strict(),
  },
};

type TSettings = z.infer<typeof Settings.schema.select>;
type TSettingsUpdate = z.infer<typeof Settings.schema.update>;

export { Settings, settingsTable, TSettings, TSettingsUpdate };
