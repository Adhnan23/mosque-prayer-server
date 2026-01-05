import db from "@db";
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

const translations = [
  // --- UI LABELS (Public Display) ---
  { language_code: "en", category: "ui", key: "fajr", value: "Fajr" },
  { language_code: "en", category: "ui", key: "sunrise", value: "Sunrise" },
  { language_code: "en", category: "ui", key: "dhuhr", value: "Dhuhr" },
  { language_code: "en", category: "ui", key: "asr", value: "Asr" },
  { language_code: "en", category: "ui", key: "maghrib", value: "Maghrib" },
  { language_code: "en", category: "ui", key: "isha", value: "Isha" },
  { language_code: "en", category: "ui", key: "jummah", value: "Jummah" },
  { language_code: "en", category: "ui", key: "ikamah", value: "Ikamah" },
  { language_code: "en", category: "ui", key: "begins", value: "Begins" },
  {
    language_code: "en",
    category: "ui",
    key: "next_prayer",
    value: "Next Prayer",
  },
  {
    language_code: "en",
    category: "ui",
    key: "silent_phone",
    value: "Please silence your phones",
  },
  {
    language_code: "en",
    category: "ui",
    key: "straighten_rows",
    value: "Straighten your rows",
  },

  { language_code: "ta", category: "ui", key: "fajr", value: "பஜ்ர்" },
  { language_code: "ta", category: "ui", key: "sunrise", value: "சூரியோதயம்" },
  { language_code: "ta", category: "ui", key: "dhuhr", value: "ளுஹர்" },
  { language_code: "ta", category: "ui", key: "asr", value: "அஸர்" },
  { language_code: "ta", category: "ui", key: "maghrib", value: "மக்ரிப்" },
  { language_code: "ta", category: "ui", key: "isha", value: "இஷா" },
  { language_code: "ta", category: "ui", key: "jummah", value: "ஜும்மா" },
  { language_code: "ta", category: "ui", key: "ikamah", value: "இகாமத்" },
  { language_code: "ta", category: "ui", key: "begins", value: "ஆரம்பம்" },
  {
    language_code: "ta",
    category: "ui",
    key: "next_prayer",
    value: "அடுத்த தொழுகை",
  },
  {
    language_code: "ta",
    category: "ui",
    key: "silent_phone",
    value: "தொலைபேசிகளை அணைத்து வைக்கவும்",
  },

  { language_code: "si", category: "ui", key: "fajr", value: "ෆජ්ර්" },
  { language_code: "si", category: "ui", key: "sunrise", value: "ඉර උදාව" },
  { language_code: "si", category: "ui", key: "dhuhr", value: "දුහ්ර්" },
  { language_code: "si", category: "ui", key: "asr", value: "අසර්" },
  { language_code: "si", category: "ui", key: "maghrib", value: "මග්රිබ්" },
  { language_code: "si", category: "ui", key: "isha", value: "ඉෂා" },
  { language_code: "si", category: "ui", key: "jummah", value: "ජුම්මා" },
  { language_code: "si", category: "ui", key: "ikamah", value: "ඉකාමත්" },

  // --- HIJRI MONTHS (English) ---
  { language_code: "en", category: "hijri", key: "m1", value: "Muharram" },
  { language_code: "en", category: "hijri", key: "m2", value: "Safar" },
  {
    language_code: "en",
    category: "hijri",
    key: "m3",
    value: "Rabi' al-Awwal",
  },
  {
    language_code: "en",
    category: "hijri",
    key: "m4",
    value: "Rabi' al-Thani",
  },
  {
    language_code: "en",
    category: "hijri",
    key: "m5",
    value: "Jumada al-Awwal",
  },
  {
    language_code: "en",
    category: "hijri",
    key: "m6",
    value: "Jumada al-Thani",
  },
  { language_code: "en", category: "hijri", key: "m7", value: "Rajab" },
  { language_code: "en", category: "hijri", key: "m8", value: "Sha'ban" },
  { language_code: "en", category: "hijri", key: "m9", value: "Ramadan" },
  { language_code: "en", category: "hijri", key: "m10", value: "Shawwal" },
  {
    language_code: "en",
    category: "hijri",
    key: "m11",
    value: "Dhu al-Qi'dah",
  },
  {
    language_code: "en",
    category: "hijri",
    key: "m12",
    value: "Dhu al-Hijjah",
  },

  // --- HIJRI MONTHS (Tamil) ---
  { language_code: "ta", category: "hijri", key: "m1", value: "முஹர்ரம்" },
  { language_code: "ta", category: "hijri", key: "m2", value: "ஸஃபர்" },
  {
    language_code: "ta",
    category: "hijri",
    key: "m3",
    value: "ரபி உல் அவ்வல்",
  },
  { language_code: "ta", category: "hijri", key: "m4", value: "ரபி உல் தானி" },
  {
    language_code: "ta",
    category: "hijri",
    key: "m5",
    value: "ஜுமாதல் அவ்வல்",
  },
  { language_code: "ta", category: "hijri", key: "m6", value: "ஜுமாதல் தானி" },
  { language_code: "ta", category: "hijri", key: "m7", value: "ரஜப்" },
  { language_code: "ta", category: "hijri", key: "m8", value: "ஷஃபான்" },
  { language_code: "ta", category: "hijri", key: "m9", value: "ரமலான்" },
  { language_code: "ta", category: "hijri", key: "m10", value: "ஷவ்வால்" },
  { language_code: "ta", category: "hijri", key: "m11", value: "துல் கஃதா" },
  { language_code: "ta", category: "hijri", key: "m12", value: "துல் ஹஜ்" },

  // --- ISLAMIC EVENTS ---
  {
    language_code: "en",
    category: "events",
    key: "eid_ul_fitr",
    value: "Eid-ul-Fitr",
  },
  {
    language_code: "en",
    category: "events",
    key: "eid_ul_adha",
    value: "Eid-ul-Adha",
  },
  { language_code: "en", category: "events", key: "ashura", value: "Ashura" },
  {
    language_code: "en",
    category: "events",
    key: "laylat_al_qadr",
    value: "Laylat al-Qadr",
  },
  {
    language_code: "en",
    category: "events",
    key: "isra_miraj",
    value: "Isra & Mi'raj",
  },

  {
    language_code: "ta",
    category: "events",
    key: "eid_ul_fitr",
    value: "ஈகைத் திருநாள்",
  },
  {
    language_code: "ta",
    category: "events",
    key: "eid_ul_adha",
    value: "ஹஜ்ஜுப் பெருநாள்",
  },

  // --- ADMIN DASHBOARD & ACTIONS ---
  {
    language_code: "en",
    category: "admin",
    key: "dashboard",
    value: "Dashboard",
  },
  {
    language_code: "en",
    category: "admin",
    key: "prayer_times",
    value: "Prayer Times",
  },
  {
    language_code: "en",
    category: "admin",
    key: "settings",
    value: "System Settings",
  },
  {
    language_code: "en",
    category: "admin",
    key: "notices",
    value: "Notice Board",
  },
  {
    language_code: "en",
    category: "admin",
    key: "hijri_adjustment",
    value: "Hijri Offset",
  },

  {
    language_code: "en",
    category: "actions",
    key: "save",
    value: "Save Changes",
  },
  {
    language_code: "en",
    category: "actions",
    key: "edit",
    value: "Edit Entry",
  },
  { language_code: "en", category: "actions", key: "delete", value: "Delete" },
  { language_code: "en", category: "actions", key: "cancel", value: "Cancel" },
  {
    language_code: "en",
    category: "actions",
    key: "add_new",
    value: "Add New",
  },

  {
    language_code: "ta",
    category: "admin",
    key: "dashboard",
    value: "கட்டுப்பாட்டு அறை",
  },
  {
    language_code: "ta",
    category: "admin",
    key: "settings",
    value: "அமைப்புகள்",
  },
  { language_code: "ta", category: "actions", key: "save", value: "சேமி" },

  // --- FORM FIELDS ---
  {
    language_code: "en",
    category: "fields",
    key: "mosque_name",
    value: "Mosque Name",
  },
  {
    language_code: "en",
    category: "fields",
    key: "language_code",
    value: "Default Language",
  },
  {
    language_code: "en",
    category: "fields",
    key: "time_format",
    value: "Time Format",
  },
  {
    language_code: "en",
    category: "fields",
    key: "primary_color",
    value: "Theme Color",
  },
  {
    language_code: "en",
    category: "fields",
    key: "is_ramadan",
    value: "Enable Ramadan Mode",
  },
];

const countRows = async (table: any) => {
  return (await db.select().from(table).all()).length;
};

const generatePrayerTimes = async () => {
  const rowCount = await countRows(PrayerTime.table);
  if (rowCount === 0) {
    const rows = [];
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= daysInMonth[month - 1]; day++) {
        rows.push({ month, day, ...defaultPrayerTimes });
      }
    }
    await db.insert(PrayerTime.table).values(rows);
    console.log("Prayer Time table filled:", rows.length, "rows");
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
  //await generateTranslations();
};

seed();
