import db from "@db";
import { Ramadan, TRamadanUpdate } from "@schemas";
import { eq, sql } from "drizzle-orm";

const RamadanServices = {
  get: async () => {
    const [result] = await db
      .select({
        suhur_end: Ramadan.table.suhur_end,
        taraweeh: Ramadan.table.taraweeh,
      })
      .from(Ramadan.table)
      .limit(1);

    return result;
  },
  update: async (data: TRamadanUpdate) => {
    const updatedRow = await db
      .update(Ramadan.table)
      .set(data)
      .where(eq(Ramadan.table.id, 1));
    return updatedRow.rowsAffected > 0;
  },
};

export default RamadanServices;
