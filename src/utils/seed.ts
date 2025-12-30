import db from "../db";
import {
  CalendarDate,
  PrayerTime,
  Ramadan,
  Notice,
  Settings,
  IkamahDelay,
} from "../db/schemas";

const defaultPrayerTimes = {
  fajr: "05:00",
  sunrise: "06:15",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:00",
  isha: "19:30",
};

const defaultRamadan = {
  suhur: "04:50",
  sunset: "17:58",
  taraweeh: "20:00",
};

const defaultIkamahDelay = {
  fajr: 30,
  jummah: 10,
  dhuhr: 15,
  asr: 15,
  maghrib: 10,
  isha: 15,
};

const defaultNotices = [
  {
    noticeContent: "Welcome to the mosque",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
  },
  {
    noticeContent: "Jummah starts at 1:30 PM",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
  },
];

const defaultSettings = [
  { name: "time-format", value: "12h" },
  { name: "is-ramadan", value: "false" },
  { name: "hijri-offset", value: "-1" },

  { name: "primary-color", value: "#0d6efd" },
  { name: "secondary-color", value: "#6c757d" },
  { name: "background-color", value: "#ffffff" },
  { name: "foreground-color", value: "#000000" },
  { name: "accent-color", value: "#198754" },
];

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

async function seedIkamahDelay() {
  const existing = await db.select().from(IkamahDelay.table).all();
  if (existing.length === 0) {
    await db.insert(IkamahDelay.table).values(defaultIkamahDelay).run();
    console.log("IkamahDelay table seeded");
  }
}

async function seedRamadan() {
  const existing = await db.select().from(Ramadan.table).all();
  if (existing.length === 0) {
    await db.insert(Ramadan.table).values(defaultRamadan).run();
    console.log("Ramadan table seeded");
  }
}

async function seedNotices() {
  const existing = await db.select().from(Notice.table).all();
  if (existing.length === 0) {
    await db.insert(Notice.table).values(defaultNotices).run();
    console.log("Notice table seeded:", defaultNotices.length, "rows");
  }
}

async function seedSettings() {
  const existing = await db.select().from(Settings.table).all();
  if (existing.length === 0) {
    await db.insert(Settings.table).values(defaultSettings).run();
    console.log("Settings table seeded:", defaultSettings.length, "rows");
  }
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
  // Calendar dates
  const countDates = await db.select().from(CalendarDate.table).all();
  if (countDates.length === 0) {
    const dates = generateCalendarDates();
    await db.insert(CalendarDate.table).values(dates).run();
    console.log("Calendar table filled:", dates.length, "rows");
  }

  // Prayer times
  const countPrayer = await db.select().from(PrayerTime.table).all();
  if (countPrayer.length === 0) {
    await fillPrayerTimes();
  }

  // ✅ NEW TABLES
  await seedRamadan();
  await seedIkamahDelay();
  await seedNotices();
  await seedSettings();
}

await seed().catch(console.error);
