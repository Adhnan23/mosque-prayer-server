import db from "@db";
import { Settings, TSettingsUpdate } from "@schemas";
import { sql } from "drizzle-orm";

type SettingsColumn = keyof TSettingsUpdate;

const SettingsServices = {
  get: async () => {
    const [result] = await db.select().from(Settings.table).limit(1);
    const { id, ...rest } = result;
    return rest;
  },
  getByColumn: async <K extends SettingsColumn>(
    column: K
  ): Promise<TSettingsUpdate[K] | null> => {
    const [row] = await db
      .select({ value: Settings.table[column] })
      .from(Settings.table)
      .limit(1);

    return row?.value ?? null;
  },
  update: async (data: TSettingsUpdate) =>
    await db
      .update(Settings.table)
      .set(data)
      .where(sql`${Settings.table.id} = 1`),
};

export default SettingsServices;
