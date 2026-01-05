import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { timeField } from "@utils";

export const ramadanTable = sqliteTable(
    "ramadan",
    {
        id: integer("id").primaryKey().default(1),
        suhur_end: text("suhur_end").notNull().default("04:30"),
        taraweeh: text("taraweeh").notNull().default("20:00"),
    },
    (table) => [
        check("ramadan_single_row", sql`${table.id} = 1`),
        check("suhur_format", sql`${table.suhur_end} LIKE '__:__'`),
        check("taraweeh_format", sql`${table.taraweeh} LIKE '__:__'`),
    ]
);



const Ramadan = {
    table: ramadanTable,
    schema: {
        select: createSelectSchema(ramadanTable).strict(),
        update: createUpdateSchema(ramadanTable, {
            suhur_end: timeField,
            taraweeh: timeField,
        })
            .omit({ id: true })
            .partial()
            .strict(),
    }
};

export type TRamadan = z.infer<typeof Ramadan.schema.select>;
export type TRamadanUpdate = z.infer<typeof Ramadan.schema.update>;

export { Ramadan };