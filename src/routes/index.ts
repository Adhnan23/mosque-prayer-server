import db from "@db";
import { respond } from "@utils";
import Elysia from "elysia";
import IkamahRoute from "./ikamah.routes";
import LanguagesRoute from "./languages.routes";
import RamadanRoute from "./ramadan.routes";
import SettingsRoute from "./settings.routes";
import PrayerTimeRoute from "./prayerTime.routes";
import NoticeRoute from "./notice.routes";
import TranslationsRoute from "./translations.routes";

const ApiRoute = new Elysia({ prefix: "/api" })
  .use(IkamahRoute)
  .use(LanguagesRoute)
  .use(RamadanRoute)
  .use(SettingsRoute)
  .use(PrayerTimeRoute)
  .use(NoticeRoute)
  .use(TranslationsRoute)
  .get("/health", async () => {
    await db.run("SELECT 1");

    return respond(true, "Service is healthy", {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
export default ApiRoute;
