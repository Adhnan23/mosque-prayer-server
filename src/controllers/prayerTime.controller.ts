import { PrayerTimeServices } from "@queries";
import { TPrayerTimeUpdate } from "@schemas";
import { formatTimeRecursive, respond, TFormat, TLimit } from "@utils";
import { NotFoundError, status } from "elysia";

const PrayerTimeController = {
  getAll: async ({
    query: { limit, format },
  }: {
    query: { limit?: TLimit; format: TFormat };
  }) => {
    const results = await PrayerTimeServices.getAll(limit);
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(
      true,
      "Prayer Time fetched successfully",
      formatTimeRecursive(results, format)
    );
  },
  getMonthly: async ({
    params: { month },
    query: { limit, format },
  }: {
    params: { month: number };
    query: { limit?: TLimit; format: TFormat };
  }) => {
    const results = await PrayerTimeServices.getMonthly(month, limit);
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(
      true,
      "Prayer Time fetched successfully",
      formatTimeRecursive(results, format)
    );
  },
  get: async ({
    params: { month, day },
    query: { format },
  }: {
    params: { month: number; day: number };
    query: { format: TFormat };
  }) => {
    const results = await PrayerTimeServices.get(month, day);
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(
      true,
      "Prayer Time fetched successfully",
      formatTimeRecursive(results, format)
    );
  },
  getInRange: async ({
    params: { sm, sd, em, ed },
    query: { format },
  }: {
    params: { sm: number; sd: number; em: number; ed: number };
    query: { format: TFormat };
  }) => {
    const startRange = sm * 100 + sd;
    const endRange = em * 100 + ed;
    if (startRange > endRange)
      return status(400, respond(false, "Invalid date range"));
    const results = await PrayerTimeServices.getInRange([sm, sd], [em, ed]);
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(
      true,
      "Prayer Time fetched successfully",
      formatTimeRecursive(results, format)
    );
  },
  today: async ({ query: { format } }: { query: { format: TFormat } }) => {
    const results = await PrayerTimeServices.today();
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(
      true,
      "Prayer Time fetched successfully",
      formatTimeRecursive(results, format)
    );
  },
  update: async ({
    params: { month, day },
    body,
  }: {
    params: { month: number; day: number };
    body: TPrayerTimeUpdate;
  }) => {
    const results = await PrayerTimeServices.update(month, day, body);
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(true, "Prayer Time Updated successfully", results);
  },
  updateByRange: async ({
    params: { sm, sd, em, ed },
    body,
  }: {
    params: { sm: number; sd: number; em: number; ed: number };
    body: TPrayerTimeUpdate;
  }) => {
    const startRange = sm * 100 + sd;
    const endRange = em * 100 + ed;
    if (startRange > endRange)
      return status(400, respond(false, "Invalid date range"));
    const results = await PrayerTimeServices.updateByRange(
      [sm, sd],
      [em, ed],
      body
    );
    if (!results) throw new NotFoundError("PrayerTime not found");
    return respond(true, "Prayer Time Updated successfully", results);
  },
};

export default PrayerTimeController;
