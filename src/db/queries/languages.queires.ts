import db from "@db";
import { Languages, TLanguageInsert } from "@schemas";
import { eq } from "drizzle-orm";

const LanguagesServices = {
  get: async () => await db.select().from(Languages.table),
  getByCode: async (code: string) => {
    const [value] = await db
      .select({ name: Languages.table.name })
      .from(Languages.table)
      .where(eq(Languages.table.code, code.toLocaleLowerCase()));

    return value?.name;
  },
  insert: async (data: TLanguageInsert) => {
    const [row] = await db.insert(Languages.table).values(data).returning();
    return row;
  },
  delete: async (code: string) =>
    await db.delete(Languages.table).where(eq(Languages.table.code, code)),
};

export default LanguagesServices;
