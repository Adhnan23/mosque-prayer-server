import db from "@db";
import { Languages, TLanguageInsert } from "@schemas";
import { eq } from "drizzle-orm";

const LanguagesServices = {
  get: async () => await db.select().from(Languages.table),
  getByCode: async (code: string) => {
    const [value] = await db
      .select({ name: Languages.table.name })
      .from(Languages.table)
      .where(eq(Languages.table.code, code.toLowerCase()));

    return value?.name;
  },
  insert: async (data: TLanguageInsert) => {
    const row = await db
      .insert(Languages.table)
      .values({ ...data, code: data.code.toLowerCase() });
    return row.rowsAffected > 0;
  },
  delete: async (code: string) => {
    const deletedRow = await db
      .delete(Languages.table)
      .where(eq(Languages.table.code, code.toLowerCase()));
    return deletedRow.rowsAffected > 0;
  },
};

export default LanguagesServices;
