import db from "../db";
import {
  CalendarDate,
  PrayerTime,
  Ramadan,
  Notice,
  Settings,
  IkamahDelay,
  Language,
  Translation,
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
  { name: "language", value: "ta" },

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

async function seedLocalization() {
  await db
    .insert(Language.table)
    .values([
      { code: "en", name: "English" },
      { code: "ta", name: "தமிழ்" },
      { code: "si", name: "සිංහල" },
    ])
    .onConflictDoNothing()
    .run();

  const translations = [
    // ======================================================
    // CATEGORY: TIME NAMES (Prayers, Sun events, Ramadan)
    // ======================================================

    // --- ENGLISH ---
    { langCode: "en", category: "time_name", key: "fajr", value: "Fajr" },
    { langCode: "en", category: "time_name", key: "sunrise", value: "Sunrise" },
    { langCode: "en", category: "time_name", key: "dhuhr", value: "Dhuhr" },
    { langCode: "en", category: "time_name", key: "asr", value: "Asr" },
    { langCode: "en", category: "time_name", key: "maghrib", value: "Maghrib" },
    { langCode: "en", category: "time_name", key: "isha", value: "Isha" },
    { langCode: "en", category: "time_name", key: "jummah", value: "Jummah" },

    { langCode: "en", category: "time_name", key: "suhur", value: "Suhur" },
    { langCode: "en", category: "time_name", key: "sunset", value: "Sunset" },
    {
      langCode: "en",
      category: "time_name",
      key: "taraweeh",
      value: "Taraweeh",
    },

    // --- TAMIL ---
    { langCode: "ta", category: "time_name", key: "fajr", value: "ஃபஜ்ர்" },
    {
      langCode: "ta",
      category: "time_name",
      key: "sunrise",
      value: "சூரிய உதயம்",
    },
    { langCode: "ta", category: "time_name", key: "dhuhr", value: "ளுஹர்" },
    { langCode: "ta", category: "time_name", key: "asr", value: "அஸ்ர்" },
    { langCode: "ta", category: "time_name", key: "maghrib", value: "மக்ரிப்" },
    { langCode: "ta", category: "time_name", key: "isha", value: "இஷா" },
    { langCode: "ta", category: "time_name", key: "jummah", value: "ஜும்ஆ" },

    { langCode: "ta", category: "time_name", key: "suhur", value: "ஸஹர்" },
    {
      langCode: "ta",
      category: "time_name",
      key: "sunset",
      value: "சூரிய மறைவு",
    },
    {
      langCode: "ta",
      category: "time_name",
      key: "taraweeh",
      value: "தராவிஹ்",
    },

    // --- SINHALA ---
    { langCode: "si", category: "time_name", key: "fajr", value: "ෆජ්ර්" },
    {
      langCode: "si",
      category: "time_name",
      key: "sunrise",
      value: "හිරු උදාව",
    },
    { langCode: "si", category: "time_name", key: "dhuhr", value: "ලුහුර්" },
    { langCode: "si", category: "time_name", key: "asr", value: "අස්ර්" },
    { langCode: "si", category: "time_name", key: "maghrib", value: "මග්රිබ්" },
    { langCode: "si", category: "time_name", key: "isha", value: "ඉෂා" },
    { langCode: "si", category: "time_name", key: "jummah", value: "ජුම්ආ" },

    { langCode: "si", category: "time_name", key: "suhur", value: "සහර්" },
    {
      langCode: "si",
      category: "time_name",
      key: "sunset",
      value: "හිරු බැසීම",
    },
    {
      langCode: "si",
      category: "time_name",
      key: "taraweeh",
      value: "තරාවිහ්",
    },

    // ======================================================
    // CATEGORY: WEEKDAYS (0=Sunday ... 6=Saturday)
    // ======================================================
    // English
    { langCode: "en", category: "weekday", key: "0", value: "Sunday" },
    { langCode: "en", category: "weekday", key: "1", value: "Monday" },
    { langCode: "en", category: "weekday", key: "2", value: "Tuesday" },
    { langCode: "en", category: "weekday", key: "3", value: "Wednesday" },
    { langCode: "en", category: "weekday", key: "4", value: "Thursday" },
    { langCode: "en", category: "weekday", key: "5", value: "Friday" },
    { langCode: "en", category: "weekday", key: "6", value: "Saturday" },
    // Tamil
    { langCode: "ta", category: "weekday", key: "0", value: "ஞாயிறு" },
    { langCode: "ta", category: "weekday", key: "1", value: "திங்கள்" },
    { langCode: "ta", category: "weekday", key: "2", value: "செவ்வாய்" },
    { langCode: "ta", category: "weekday", key: "3", value: "புதன்" },
    { langCode: "ta", category: "weekday", key: "4", value: "வியாழன்" },
    { langCode: "ta", category: "weekday", key: "5", value: "வெள்ளி" },
    { langCode: "ta", category: "weekday", key: "6", value: "சனி" },
    // Sinhala
    { langCode: "si", category: "weekday", key: "0", value: "ඉරිදා" },
    { langCode: "si", category: "weekday", key: "1", value: "සඳුදා" },
    { langCode: "si", category: "weekday", key: "2", value: "අඟහරුවාදා" },
    { langCode: "si", category: "weekday", key: "3", value: "බදාදා" },
    { langCode: "si", category: "weekday", key: "4", value: "බ්‍රහස්පතින්දා" },
    { langCode: "si", category: "weekday", key: "5", value: "සිකුරාදා" },
    { langCode: "si", category: "weekday", key: "6", value: "සෙනසුරාදා" },

    // ======================================================
    // CATEGORY: GREGORIAN MONTHS (1=Jan ... 12=Dec)
    // ======================================================
    // English
    { langCode: "en", category: "month_greg", key: "1", value: "January" },
    { langCode: "en", category: "month_greg", key: "2", value: "February" },
    { langCode: "en", category: "month_greg", key: "3", value: "March" },
    { langCode: "en", category: "month_greg", key: "4", value: "April" },
    { langCode: "en", category: "month_greg", key: "5", value: "May" },
    { langCode: "en", category: "month_greg", key: "6", value: "June" },
    { langCode: "en", category: "month_greg", key: "7", value: "July" },
    { langCode: "en", category: "month_greg", key: "8", value: "August" },
    { langCode: "en", category: "month_greg", key: "9", value: "September" },
    { langCode: "en", category: "month_greg", key: "10", value: "October" },
    { langCode: "en", category: "month_greg", key: "11", value: "November" },
    { langCode: "en", category: "month_greg", key: "12", value: "December" },

    // Tamil
    { langCode: "ta", category: "month_greg", key: "1", value: "ஜனவரி" },
    { langCode: "ta", category: "month_greg", key: "2", value: "பிப்ரவரி" },
    { langCode: "ta", category: "month_greg", key: "3", value: "மார்ச்" },
    { langCode: "ta", category: "month_greg", key: "4", value: "ஏப்ரல்" },
    { langCode: "ta", category: "month_greg", key: "5", value: "மே" },
    { langCode: "ta", category: "month_greg", key: "6", value: "ஜூன்" },
    { langCode: "ta", category: "month_greg", key: "7", value: "ஜூலை" },
    { langCode: "ta", category: "month_greg", key: "8", value: "ஆகஸ்ட்" },
    { langCode: "ta", category: "month_greg", key: "9", value: "செப்டம்பர்" },
    { langCode: "ta", category: "month_greg", key: "10", value: "அக்டோபர்" },
    { langCode: "ta", category: "month_greg", key: "11", value: "நவம்பர்" },
    { langCode: "ta", category: "month_greg", key: "12", value: "டிசம்பர்" },

    // Sinhala
    { langCode: "si", category: "month_greg", key: "1", value: "ජනවාරි" },
    { langCode: "si", category: "month_greg", key: "2", value: "පෙබරවාරි" },
    { langCode: "si", category: "month_greg", key: "3", value: "මාර්තු" },
    { langCode: "si", category: "month_greg", key: "4", value: "අප්‍රේල්" },
    { langCode: "si", category: "month_greg", key: "5", value: "මැයි" },
    { langCode: "si", category: "month_greg", key: "6", value: "ජූනි" },
    { langCode: "si", category: "month_greg", key: "7", value: "ජූලි" },
    { langCode: "si", category: "month_greg", key: "8", value: "අගෝස්තු" },
    { langCode: "si", category: "month_greg", key: "9", value: "සැප්තැම්බර්" },
    { langCode: "si", category: "month_greg", key: "10", value: "ඔක්තෝබර්" },
    { langCode: "si", category: "month_greg", key: "11", value: "නොවැම්බර්" },
    { langCode: "si", category: "month_greg", key: "12", value: "දෙසැම්බර්" },

    // ======================================================
    // CATEGORY: HIJRI MONTHS
    // ======================================================
    // Tamil
    { langCode: "ta", category: "month_hijri", key: "1", value: "முஹர்ரம்" },
    { langCode: "ta", category: "month_hijri", key: "2", value: "சஃபர்" },
    {
      langCode: "ta",
      category: "month_hijri",
      key: "3",
      value: "ரபிஉல் அவ்வள்",
    },
    {
      langCode: "ta",
      category: "month_hijri",
      key: "4",
      value: "ரபிஉல் ஆகிர்",
    },
    {
      langCode: "ta",
      category: "month_hijri",
      key: "5",
      value: "ஜமாஅத்துல் அவ்வள்",
    },
    {
      langCode: "ta",
      category: "month_hijri",
      key: "6",
      value: "ஜமாஅத்துல் ஆகிர்",
    },
    { langCode: "ta", category: "month_hijri", key: "7", value: "ரஜப்" },
    { langCode: "ta", category: "month_hijri", key: "8", value: "ஷஃபான்" },
    { langCode: "ta", category: "month_hijri", key: "9", value: "ரம்லான்" },
    { langCode: "ta", category: "month_hijri", key: "10", value: "ஷவ்வால்" },
    { langCode: "ta", category: "month_hijri", key: "11", value: "துல் கஅதா" },
    { langCode: "ta", category: "month_hijri", key: "12", value: "துல் ஹஜ்" },

    // Sinhala
    { langCode: "si", category: "month_hijri", key: "1", value: "මුහර්රම්" },
    { langCode: "si", category: "month_hijri", key: "2", value: "සෆර්" },
    {
      langCode: "si",
      category: "month_hijri",
      key: "3",
      value: "රබීඋල් අව්වල්",
    },
    {
      langCode: "si",
      category: "month_hijri",
      key: "4",
      value: "රබීඋල් ආඛිර්",
    },
    {
      langCode: "si",
      category: "month_hijri",
      key: "5",
      value: "ජමාදුල් අව්වල්",
    },
    {
      langCode: "si",
      category: "month_hijri",
      key: "6",
      value: "ජමාදුල් ආඛිර්",
    },
    { langCode: "si", category: "month_hijri", key: "7", value: "රජබ්" },
    { langCode: "si", category: "month_hijri", key: "8", value: "ශාබාන්" },
    { langCode: "si", category: "month_hijri", key: "9", value: "රාමලාන්" },
    { langCode: "si", category: "month_hijri", key: "10", value: "ශව්වාල්" },
    { langCode: "si", category: "month_hijri", key: "11", value: "දුල් කඅදා" },
    { langCode: "si", category: "month_hijri", key: "12", value: "දුල් හජ්" },
  ];

  await db
    .insert(Translation.table)
    .values(translations)
    .onConflictDoNothing()
    .run();
  console.log("Localization seeded successfully!");
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
  await seedLocalization();
}

await seed().catch(console.error);
