import { eq } from "drizzle-orm";
import db from "../index.js";
import { IkamahDelay } from "../schema/index.js";

const IkamahDelayServices = {
  get: async () => {
    const [results] = await db
      .select({
        fajir: IkamahDelay.table.fajir,
        jummah: IkamahDelay.table.jummah,
        duhar: IkamahDelay.table.dhuar,
        asar: IkamahDelay.table.asar,
        magrib: IkamahDelay.table.magrib,
        isha: IkamahDelay.table.isha,
      })
      .from(IkamahDelay.table)
      .limit(1);
    return results;
  },
  update: async (data) => {
    if (!data || Object.keys(data).length === 0) return 0;
    const [result] = await db
      .update(IkamahDelay.table)
      .set(data)
      .where(eq(IkamahDelay.table.id, 1))
      .returning();

    return result;
  },
};

export default IkamahDelayServices;
