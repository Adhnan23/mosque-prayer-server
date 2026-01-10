import db from "@db";
import { Ikamah, TIkamahUpdate } from "@schemas";
import { eq } from "drizzle-orm";
import { PrayerTimeServices } from "@queries";
import { addDelayToTime } from "src/utils/time";

const IkamahServices = {
  get: async () => {
    const [result] = await db
      .select({
        fajr: Ikamah.table.fajr,
        dhuhr: Ikamah.table.dhuhr,
        asr: Ikamah.table.asr,
        maghrib: Ikamah.table.maghrib,
        isha: Ikamah.table.isha,
        jummah: Ikamah.table.jummah,
      })
      .from(Ikamah.table)
      .limit(1);

    return result;
  },
  time: async () => {
    const ikamah = await IkamahServices.get();
    if (!ikamah) return null;

    const [prayer] = await PrayerTimeServices.today();
    if (!prayer) return null;
    return {
      fajr: addDelayToTime(prayer.fajr, ikamah.fajr),
      dhuhr: addDelayToTime(prayer.dhuhr, ikamah.dhuhr),
      asr: addDelayToTime(prayer.asr, ikamah.asr),
      maghrib: addDelayToTime(prayer.maghrib, ikamah.maghrib),
      isha: addDelayToTime(prayer.isha, ikamah.isha),
      jummah: addDelayToTime(prayer.dhuhr, ikamah.jummah),
    };
  },
  update: async (data: TIkamahUpdate) => {
    const updatedRow = await db
      .update(Ikamah.table)
      .set(data)
      .where(eq(Ikamah.table.id, 1));
    return updatedRow.rowsAffected > 0;
  },
};

export default IkamahServices;
