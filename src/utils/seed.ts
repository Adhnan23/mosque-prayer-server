import db from "@db";
import translations from "./translation.json" assert { type: "json" };
import prayerTimes from "./Prayer_Times.json" assert { type: "json" };
import {
  Ikamah,
  Languages,
  Notice,
  PrayerTime,
  Ramadan,
  Settings,
  Translations,
} from "@schemas";

const defaultPrayerTimes = {
  fajr: "05:00",
  sunrise: "06:15",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:00",
  isha: "19:30",
};

const notices = [
  {
    language_code: "ta",
    content:
      "எங்கள் பிரார்த்தனை பயன்பாட்டுக்கு வரவேற்கின்றோம்! தினசரி பிரார்த்தனை நேரங்களை புதுப்பிக்கவும்.",
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    is_active: true,
  },
];

const countRows = async (table: any) => {
  return (await db.select().from(table).all()).length;
};

const generatePrayerTimes = async () => {
  const rowCount = await countRows(PrayerTime.table);
  if (rowCount === 0) {
    // const rows = [];
    // const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // for (let month = 1; month <= 12; month++) {
    //   for (let day = 1; day <= daysInMonth[month - 1]; day++) {
    //     rows.push({ month, day, ...defaultPrayerTimes });
    //   }
    // }
    await db.insert(PrayerTime.table).values(prayerTimes);
    console.log("Prayer Time table filled:", prayerTimes.length, "rows");
  }
};

const generateIkamah = async () => {
  const rowCount = await countRows(Ikamah.table);
  if (rowCount === 0) await db.insert(Ikamah.table).values({});
  console.log("Ikamah Delay Added");
};

const generateRamadan = async () => {
  const rowCount = await countRows(Ramadan.table);
  if (rowCount === 0) await db.insert(Ramadan.table).values({});
  console.log("Ramadan Time Added");
};

const generateSettings = async () => {
  const rowCount = await countRows(Settings.table);
  if (rowCount === 0) await db.insert(Settings.table).values({});
  console.log("Settings Added");
};

const generateLanguages = async () => {
  const rowCount = await countRows(Languages.table);
  if (rowCount === 0)
    await db.insert(Languages.table).values([
      { code: "en", name: "english" },
      { code: "ta", name: "தமிழ்" },
      { code: "si", name: "සිංහල" },
    ]);
  console.log("Languages Added");
};

const generateNotices = async () => {
  const rowCount = await countRows(Notice.table);
  if (rowCount === 0) {
    await db.insert(Notice.table).values(notices);
    console.log("Notices Added:", notices.length);
  }
};

const generateTranslations = async () => {
  const rowCount = await countRows(Translations.table);
  if (rowCount === 0) {
    await db.insert(Translations.table).values(translations);
    console.log("Translations Added:", translations.length);
  }
};

const seed = async () => {
  await generatePrayerTimes();
  await generateIkamah();
  await generateRamadan();
  await generateLanguages();
  await generateSettings();
  await generateNotices();
  await generateTranslations();
};

seed();
