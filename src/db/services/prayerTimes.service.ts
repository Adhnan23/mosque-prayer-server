import { eq, and, between, sql, inArray } from "drizzle-orm";
import db from "..";
import { CalendarDate, PrayerTime, TPrayerTimeUpdate } from "../schemas";

const PrayerTimeServices = {
  getAll: async (limit: number | null = null) => {
    let query = db
      .select({
        month: CalendarDate.table.month,
        day: CalendarDate.table.day,
        fajr: PrayerTime.table.fajr,
        sunrise: PrayerTime.table.sunrise,
        dhuhr: PrayerTime.table.dhuhr,
        asr: PrayerTime.table.asr,
        maghrib: PrayerTime.table.maghrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      )
      .$dynamic();

    if (limit) {
      query = query.limit(limit);
    }
    const results = await query;
    return results;
  },
  getMonthly: async (month: number, limit: number | null = null) => {
    let query = db
      .select({
        day: CalendarDate.table.day,
        fajr: PrayerTime.table.fajr,
        sunrise: PrayerTime.table.sunrise,
        dhuhr: PrayerTime.table.dhuhr,
        asr: PrayerTime.table.asr,
        maghrib: PrayerTime.table.maghrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      )
      .where(eq(CalendarDate.table.month, month))
      .$dynamic();

    if (limit) {
      query = query.limit(limit);
    }
    const results = await query;
    return results;
  },
  get: async (month: number, day: number) => {
    const [result] = await db
      .select({
        fajr: PrayerTime.table.fajr,
        sunrise: PrayerTime.table.sunrise,
        dhuhr: PrayerTime.table.dhuhr,
        asr: PrayerTime.table.asr,
        maghrib: PrayerTime.table.maghrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      )
      .where(
        and(
          eq(CalendarDate.table.month, month),
          eq(CalendarDate.table.day, day)
        )
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
      .select({
        month: CalendarDate.table.month,
        day: CalendarDate.table.day,
        fajr: PrayerTime.table.fajr,
        sunrise: PrayerTime.table.sunrise,
        dhuhr: PrayerTime.table.dhuhr,
        asr: PrayerTime.table.asr,
        maghrib: PrayerTime.table.maghrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      )
      .where(
        between(
          sql`${CalendarDate.table.month} * 100 + ${CalendarDate.table.day}`,
          start,
          end
        )
      )
      .orderBy(
        sql`${CalendarDate.table.month} asc, ${CalendarDate.table.day} asc`
      );

    return results;
  },
  update: async (month: number, day: number, data: TPrayerTimeUpdate) => {
    const dateRow = await db
      .select({ id: CalendarDate.table.id })
      .from(CalendarDate.table)
      .where(
        and(
          eq(CalendarDate.table.month, month),
          eq(CalendarDate.table.day, day)
        )
      )
      .limit(1);

    if (dateRow.length === 0) return 0;

    const dateId = dateRow[0].id;

    const [result] = await db
      .update(PrayerTime.table)
      .set(data)
      .where(eq(PrayerTime.table.dateId, dateId))
      .returning();

    return result;
  },
  updateByRange: async (
    [sm, sd]: [number, number],
    [em, ed]: [number, number],
    data: TPrayerTimeUpdate
  ) => {
    const start = sm * 100 + sd;
    const end = em * 100 + ed;

    const dateIds = await db
      .select({ id: CalendarDate.table.id })
      .from(CalendarDate.table)
      .where(
        between(
          sql`${CalendarDate.table.month} * 100 + ${CalendarDate.table.day}`,
          start,
          end
        )
      );

    if (!dateIds.length) return 0;

    const ids = dateIds.map((d) => d.id);

    const result = await db
      .update(PrayerTime.table)
      .set(data)
      .where(inArray(PrayerTime.table.dateId, ids))
      .returning();

    return result;
  },
};

export default PrayerTimeServices;
