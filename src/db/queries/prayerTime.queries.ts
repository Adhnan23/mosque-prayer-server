import db from "@db";
import { PrayerTime, TPrayerTimeUpdate } from "@schemas";
import { TLimit } from "@utils";
import { and, eq, sql } from "drizzle-orm";

const PrayerTimeServices = {
  getAll: async (limit?: TLimit) => {
    const results = limit
      ? await db.select().from(PrayerTime.table).limit(limit)
      : await db.select().from(PrayerTime.table);
    return results;
  },
  getMonthly: async (month: number, limit?: TLimit) => {
    let query = db
      .select()
      .from(PrayerTime.table)
      .where(eq(PrayerTime.table.month, month))
      .$dynamic();

    if (limit) query = query.limit(limit);

    const results = await query;

    return results;
  },
  get: async (month: number, day: number) => {
    const result = await db
      .select()
      .from(PrayerTime.table)
      .where(
        and(eq(PrayerTime.table.month, month), eq(PrayerTime.table.day, day))
      );

    return result;
  },
  getInRange: async (
    [sm, sd]: [number, number],
    [em, ed]: [number, number]
  ) => {
    const start = sm * 100 + sd;
    const end = em * 100 + ed;

    const results = await db
      .select()
      .from(PrayerTime.table)
      .where(
        sql`(${PrayerTime.table.month} * 100 + ${PrayerTime.table.day}) BETWEEN ${start} AND ${end}`
      );
    return results;
  },
  today: async () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const result = await PrayerTimeServices.get(month, day);
    return result;
  },
  update: async (month: number, day: number, data: TPrayerTimeUpdate) => {
    const updatedRow = await db
      .update(PrayerTime.table)
      .set(data)
      .where(
        and(eq(PrayerTime.table.month, month), eq(PrayerTime.table.day, day))
      );
    return updatedRow;
  },
  updateByRange: async (
    [sm, sd]: [number, number],
    [em, ed]: [number, number],
    data: TPrayerTimeUpdate
  ) => {
    const start = sm * 100 + sd;
    const end = em * 100 + ed;

    const updatedRows = await db
      .update(PrayerTime.table)
      .set(data)
      .where(
        sql`(${PrayerTime.table.month} * 100 + ${PrayerTime.table.day}) BETWEEN ${start} AND ${end}`
      );
    return updatedRows;
  },
};
export default PrayerTimeServices;
