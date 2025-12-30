import { eq } from "drizzle-orm";
import db from "..";
import { IkamahDelay, TIkamahDelayUpdate } from "../schemas";

const IkamahDelayServices = {
  get: async () => {
    const [results] = await db
      .select({
        fajr: IkamahDelay.table.fajr,
        jummah: IkamahDelay.table.jummah,
        dhuhr: IkamahDelay.table.dhuhr,
        asr: IkamahDelay.table.asr,
        maghrib: IkamahDelay.table.maghrib,
        isha: IkamahDelay.table.isha,
      })
      .from(IkamahDelay.table)
      .limit(1);
    return results;
  },
  update: async (data: TIkamahDelayUpdate) => {
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
