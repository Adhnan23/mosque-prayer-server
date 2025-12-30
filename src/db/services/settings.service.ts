import db from "..";
import { Settings } from "../schemas";
import { eq } from "drizzle-orm";

const SettingsService = {
  get: async (name: string) => {
    const [row] = await db
      .select({
        name: Settings.table.name,
        value: Settings.table.value,
      })
      .from(Settings.table)
      .where(eq(Settings.table.name, name))
      .limit(1);

    return row;
  },

  update: async (name: string, value: string) => {
    const result = await db
      .update(Settings.table)
      .set({ value })
      .where(eq(Settings.table.name, name))
      .returning();

    return result;
  },

  getAll: async () => {
    const rows = await db
      .select({
        name: Settings.table.name,
        value: Settings.table.value,
      })
      .from(Settings.table);

    return rows;
  },
};

export default SettingsService;
