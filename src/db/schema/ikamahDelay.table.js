import { sqliteTable, int } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

const ikamahDelayTable = sqliteTable("ikamah_delay", {
  id: int("id").primaryKey({ autoIncrement: true }),
  fajir: int("fajir").notNull(),
  jummah: int("jummah").notNull(),
  dhuar: int("dhuar").notNull(),
  asar: int("asar").notNull(),
  magrib: int("magrib").notNull(),
  isha: int("isha").notNull(),
});

const IkamahDelay = {
  table: ikamahDelayTable,
  schema: {
    select: createSelectSchema(ikamahDelayTable).strict(),
    insert: createInsertSchema(ikamahDelayTable).strict(),
    update: createUpdateSchema(ikamahDelayTable).partial().strict(),
  },
};

export { IkamahDelay, ikamahDelayTable };
