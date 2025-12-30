import { NotFoundError } from "elysia";
import { TIkamahDelayUpdate } from "../db/schemas";
import { IkamahDelayServices, PrayerTimeServices } from "../db/services";
import respond from "../utils/respond";
import { calculateTime, isFriday } from "../utils/time";
import { collectiveTimeFormatter } from "../utils/schemas";

const IkamahDelayController = {
  get: async () => {
    const data = await IkamahDelayServices.get();
    return respond(true, "Ikamah Delay fetched successfully", data);
  },
  getTime: async ({
    query: { format },
  }: {
    query: { format: "12h" | "24h" };
  }) => {
    const today = new Date();
    const prayer = await PrayerTimeServices.get(
      today.getMonth() + 1,
      today.getDate()
    );

    if (!prayer) throw new NotFoundError("Prayer time not found for today");

    const delay = await IkamahDelayServices.get();
    if (!delay) throw new NotFoundError("Ikamah Delay not found");

    const friday = isFriday(today);

    const fajr = calculateTime(prayer.fajr, delay.fajr);
    const asr = calculateTime(prayer.asr, delay.asr);
    const maghrib = calculateTime(prayer.maghrib, delay.maghrib);
    const isha = calculateTime(prayer.isha, delay.isha);
    const dhuhrOrKutbah = calculateTime(
      prayer.dhuhr,
      friday ? delay.jummah : delay.dhuhr
    );

    return respond(
      true,
      "Ikamah times calculated successfully",
      friday
        ? collectiveTimeFormatter(format).parse({
            fajr,
            kuthbah: dhuhrOrKutbah,
            asr,
            maghrib,
            isha,
          })
        : collectiveTimeFormatter(format).parse({
            fajr,
            dhuhr: dhuhrOrKutbah,
            asr,
            maghrib,
            isha,
          })
    );
  },
  update: async ({ body }: { body: TIkamahDelayUpdate }) => {
    const data = await IkamahDelayServices.update(body);
    if (data === 0)
      throw new NotFoundError("No Ikamah Delay record found to update");
    return respond(true, "Ikamah Delay updated successfully", data);
  },
};

export default IkamahDelayController;
