import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { timeDbSchema } from "../../utils/schemas";

const ramadanTable = sqliteTable("ramadan", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  suhur: text("suhur").notNull(),
  sunset: text("sunset").notNull(),
  taraweeh: text("taraweeh").notNull(),
});

const Ramadan = {
  table: ramadanTable,
  schema: {
    select: createSelectSchema(ramadanTable, {
      id: z.number().int().positive(),
    }).strict(),
    update: createUpdateSchema(ramadanTable, {
      suhur: timeDbSchema.optional(),
      sunset: timeDbSchema.optional(),
      taraweeh: timeDbSchema.optional(),
    })
      .omit({ id: true })
      .partial()
      .strict(),
  },
};

type TRamadan = z.infer<typeof Ramadan.schema.select>;
type TRamadanUpdate = z.infer<typeof Ramadan.schema.update>;

export { Ramadan, ramadanTable, TRamadan, TRamadanUpdate };
