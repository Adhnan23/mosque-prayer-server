import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

const ramadanTable = sqliteTable("ramadan", {
  id: int("id").primaryKey({ autoIncrement: true }),
  suhur: text("suhur").notNull(),
  sunset: text("sunset").notNull(),
  taraweeh: text("taraweeh").notNull(),
});

const Ramadan = {
  table: ramadanTable,
  schema: {
    select: createSelectSchema(ramadanTable).strict(),
    insert: createInsertSchema(ramadanTable).strict(),
    update: createUpdateSchema(ramadanTable).partial().strict(),
  },
};

export { Ramadan, ramadanTable };
