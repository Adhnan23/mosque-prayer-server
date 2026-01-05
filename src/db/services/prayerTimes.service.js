import { eq, and, between, sql, inArray } from "drizzle-orm";
import db from "../index.js";
import { CalendarDate, PrayerTime } from "../schema/index.js";

const PrayerTimeServices = {
  getAll: async (limit = null) => {
    let query = db
      .select({
        month: CalendarDate.table.month,
        day: CalendarDate.table.day,
        fajir: PrayerTime.table.fajir,
        sunrise: PrayerTime.table.sunrise,
        dhuar: PrayerTime.table.dhuar,
        asar: PrayerTime.table.asar,
        magrib: PrayerTime.table.magrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      );

    if (limit) {
      query = query.limit(limit);
    }
    const results = await query;
    return results;
  },
  getMonthly: async (month, limit = null) => {
    let query = db
      .select({
        day: CalendarDate.table.day,
        fajir: PrayerTime.table.fajir,
        sunrise: PrayerTime.table.sunrise,
        dhuar: PrayerTime.table.dhuar,
        asar: PrayerTime.table.asar,
        magrib: PrayerTime.table.magrib,
        isha: PrayerTime.table.isha,
      })
      .from(PrayerTime.table)
      .leftJoin(
        CalendarDate.table,
        eq(PrayerTime.table.dateId, CalendarDate.table.id)
      )
      .where(eq(CalendarDate.table.month, month));

    if (limit) {
      query = query.limit(limit);
    }
    const results = await query;
    return results;
  },
  get: async (month, day) => {
    const results = await db
      .select({
        fajir: PrayerTime.table.fajir,
        sunrise: PrayerTime.table.sunrise,
        dhuar: PrayerTime.table.dhuar,
        asar: PrayerTime.table.asar,
        magrib: PrayerTime.table.magrib,
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

    return results;
  },
  getInRange: async ([sm, sd], [em, ed]) => {
    const start = sm * 100 + sd;
    const end = em * 100 + ed;

    const results = await db
      .select({
        month: CalendarDate.table.month,
        day: CalendarDate.table.day,
        fajir: PrayerTime.table.fajir,
        sunrise: PrayerTime.table.sunrise,
        dhuar: PrayerTime.table.dhuar,
        asar: PrayerTime.table.asar,
        magrib: PrayerTime.table.magrib,
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
  update: async (month, day, data) => {
    const dateRow = await db
      .select({ id: CalendarDate.table.id })
      .from(CalendarDate.table)
      .where(
        eq(
          sql`${CalendarDate.table.month} * 100 + ${CalendarDate.table.day}`,
          month * 100 + day
        )
      )
      .limit(1);

    if (!dateRow.length) return 0;

    const dateId = dateRow[0].id;

    const result = await db
      .update(PrayerTime.table)
      .set(data)
      .where(eq(PrayerTime.table.dateId, dateId))
      .returning();

    return result;
  },
  updateByRange: async ([sm, sd], [em, ed], data) => {
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
