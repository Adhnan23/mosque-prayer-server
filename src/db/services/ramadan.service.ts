import db from "..";
import { Ramadan, TRamadanUpdate } from "../schemas";
import { eq } from "drizzle-orm";

const RamadanServices = {
  get: async () => {
    const [results] = await db
      .select({
        suhur: Ramadan.table.suhur,
        sunset: Ramadan.table.sunset,
        taraweeh: Ramadan.table.taraweeh,
      })
      .from(Ramadan.table)
      .limit(1);

    return results;
  },

  update: async (data: TRamadanUpdate) => {
    if (!data || Object.keys(data).length === 0) return 0;

    const result = await db
      .update(Ramadan.table)
      .set(data)
      .where(eq(Ramadan.table.id, 1))
      .returning();
    return result;
  },
};

export default RamadanServices;
