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
  // English Notices
  {
    language_code: "en",
    content: "Welcome to our prayer app! Stay updated with daily prayer times.",
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    is_active: true,
  },
  {
    language_code: "en",
    content: "Don't forget to adjust your notifications for Ramadan.",
    start_date: "2026-03-01",
    end_date: "2026-04-30",
    is_active: false,
  },
  {
    language_code: "en",
    content: "Check out new features in the settings menu.",
    start_date: "2026-01-05",
    end_date: "2026-06-30",
    is_active: true,
  },

  // Tamil Notices
  {
    language_code: "ta",
    content:
      "எங்கள் பிரார்த்தனை பயன்பாட்டுக்கு வரவேற்கின்றோம்! தினசரி பிரார்த்தனை நேரங்களை புதுப்பிக்கவும்.",
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    is_active: true,
  },
  {
    language_code: "ta",
    content: "ரமலான் காலத்திற்கான அறிவிப்புகளை மாற்ற மறக்காதீர்கள்.",
    start_date: "2026-03-01",
    end_date: "2026-04-30",
    is_active: false,
  },
  {
    language_code: "ta",
    content: "அமைப்புகளில் புதிய அம்சங்களைச் சரிபார்க்கவும்.",
    start_date: "2026-01-05",
    end_date: "2026-06-30",
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
