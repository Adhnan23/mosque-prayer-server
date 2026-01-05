import db from "../index.js";
import { Settings } from "../schema/index.js";
import { eq } from "drizzle-orm";

const SettingsService = {
  get: async (name) => {
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

  update: async (name, value) => {
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
