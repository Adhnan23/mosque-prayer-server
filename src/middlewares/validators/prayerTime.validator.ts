import { PrayerTime } from "@schemas";
import { day, limit, month, timeFormat } from "@utils";
import z from "zod";

const PrayerTimeValidator = {
  getAll: {
    query: z
      .object({
        limit: limit,
        format: timeFormat,
      })
      .strict(),
  },
  getMonthly: {
    params: z.object({ month: month }),
    query: z.object({ limit: limit, format: timeFormat }),
  },
  get: {
    params: z.object({ month: month, day: day }),
    query: z.object({ limit: limit, format: timeFormat }),
  },
  getInRange: {
    params: z.object({ sm: month, sd: day, em: month, ed: day }),
    query: z.object({ format: timeFormat }),
  },
  today: {
    query: z.object({ format: timeFormat }),
  },
  update: {
    params: z.object({ month: month, day: day }),
    body: PrayerTime.schema.update,
  },
  updateByRange: {
    params: z.object({ sm: month, sd: day, em: month, ed: day }),
    body: PrayerTime.schema.update,
  },
};

export default PrayerTimeValidator;
