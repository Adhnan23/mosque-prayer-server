import { NotFoundError } from "elysia";
import { LocalizationServices, PrayerTimeServices } from "../db/services";
import respond from "../utils/respond";
import { TPrayerTimeUpdate } from "../db/schemas";
import {
  collectiveTimeFormatter,
  transformTimesAndTranslate,
} from "../utils/schemas";
import { isFriday } from "../utils/time";

const PrayerTimeController = {
  getAll: async ({
    query: { limit, format = "24h" },
  }: {
    query: { limit?: number; format?: "12h" | "24h" };
  }) => {
    const data = await PrayerTimeServices.getAll(limit);
    if (!data) throw new NotFoundError("No prayer times found");
    return respond(
      true,
      "Prayer times retrieved successfully",
      collectiveTimeFormatter(format).parse(data)
    );
  },
  getMonthly: async ({
    params: { month },
    query: { limit, format = "24h" },
  }: {
    params: { month: number };
    query: { limit?: number; format?: "12h" | "24h" };
  }) => {
    const data = await PrayerTimeServices.getMonthly(month, limit);
    if (!data) throw new NotFoundError("No prayer times found for the month");
    return respond(
      true,
      "Monthly prayer times retrieved successfully",
      collectiveTimeFormatter(format).parse(data)
    );
  },
  get: async ({
    params: { month, day },
    query: { format },
  }: {
    params: { month: number; day: number };
    query: { format?: "12h" | "24h" };
  }) => {
    const data = await PrayerTimeServices.get(month, day);
    if (!data) throw new NotFoundError("Prayer time not found for the date");
    return respond(
      true,
      "Prayer time retrieved successfully",
      collectiveTimeFormatter(format).parse(data)
    );
  },
  getInRange: async ({
    params: { startMonth, startDay, endMonth, endDay },
    query: { format },
  }: {
    params: {
      startMonth: number;
      startDay: number;
      endMonth: number;
      endDay: number;
    };
    query: { format?: "12h" | "24h" };
  }) => {
    const data = await PrayerTimeServices.getInRange(
      [startMonth, startDay],
      [endMonth, endDay]
    );
    if (!data) throw new NotFoundError("No prayer times found in the range");
    return respond(
      true,
      "Prayer times retrieved successfully",
      collectiveTimeFormatter(format).parse(data)
    );
  },
  getToday: async ({
    query: { format, lang },
  }: {
    query: { format: "12h" | "24h"; lang: string };
  }) => {
    const today = new Date();
    const friday = isFriday(today);
    let data = await PrayerTimeServices.get(
      today.getMonth() + 1,
      today.getDate()
    );
    if (!data) throw new NotFoundError("Prayer time not found for today");

    const translation = await LocalizationServices.getTranslations(
      lang,
      "time_name"
    );
    if (!translation || translation.length === 0)
      return respond(false, "Invalid Language Code");

    const translationMap = Object.fromEntries(
      translation.map((t) => [t.key, t.value])
    );

    if (friday && "dhuhr" in data) {
      const { dhuhr, ...rest } = data as any;
      data = {
        ...rest,
        jummah: dhuhr,
      };
    }

    return respond(
      true,
      "Today's prayer time retrieved successfully",
      transformTimesAndTranslate(data, format, translationMap)
    );
  },

  update: async ({
    params: { month, day },
    body,
  }: {
    params: { month: number; day: number };
    body: TPrayerTimeUpdate;
  }) => {
    const data = await PrayerTimeServices.update(month, day, body);
    if (!data) throw new NotFoundError("Prayer time not found for the date");
    return respond(true, "Prayer time updated successfully", data);
  },
  updateByRange: async ({
    params: { startMonth, startDay, endMonth, endDay },
    body,
  }: {
    params: {
      startMonth: number;
      startDay: number;
      endMonth: number;
      endDay: number;
    };
    body: TPrayerTimeUpdate;
  }) => {
    const data = await PrayerTimeServices.updateByRange(
      [startMonth, startDay],
      [endMonth, endDay],
      body
    );
    if (!data) throw new NotFoundError("No prayer times found in the range");
    return respond(true, "Prayer times updated successfully", data);
  },
};

export default PrayerTimeController;
