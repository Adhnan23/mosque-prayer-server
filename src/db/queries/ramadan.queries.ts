import db from "@db";
import { Ramadan, TRamadanUpdate } from "@schemas";
import { sql } from "drizzle-orm";

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
  update: async (data: TRamadanUpdate) =>
    await db
      .update(Ramadan.table)
      .set(data)
      .where(sql`${Ramadan.table.id} = 1`),
};

export default RamadanServices;
