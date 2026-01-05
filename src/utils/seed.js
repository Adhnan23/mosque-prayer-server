import db from "../db/index.js";
import { CalendarDate, PrayerTime } from "../db/schema/index.js";

const defaultPrayerTimes = {
  fajir: "05:00",
  sunrise: "06:15",
  dhuar: "12:30",
  asar: "15:45",
  magrib: "18:00",
  isha: "19:30",
};

function generateCalendarDates() {
  const dates = [];
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= daysInMonth[month - 1]; day++) {
      dates.push({ month, day });
    }
  }
  return dates;
}

async function fillPrayerTimes() {
  const calendarDates = await db.select().from(CalendarDate.table).all();
  const prayerRows = calendarDates.map((date) => ({
    dateId: date.id,
    ...defaultPrayerTimes,
  }));

  await db.insert(PrayerTime.table).values(prayerRows).run();

  console.log("PrayerTime table filled:", prayerRows.length, "rows");
}

async function seed() {
  const countDates = await db.select().from(CalendarDate.table).all();
  if (countDates.length === 0) {
    const dates = generateCalendarDates();
    await db.insert(CalendarDate.table).values(dates).run();
    console.log("Calendar table filled:", dates.length, "rows");
  }

  const countPrayer = await db.select().from(PrayerTime.table).all();
  if (countPrayer.length === 0) {
    await fillPrayerTimes();
  }
}

seed().catch(console.error);
