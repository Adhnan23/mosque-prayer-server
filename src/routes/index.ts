import { Elysia } from "elysia";
import ikamahRoute from "./ikamahDelay.routes";
import settingsRoute from "./settings.routes";
import ramadanRoute from "./ramadan.routes";
import prayerTimeRoute from "./prayerTime.route";
import noticeRoute from "./notice.route";

const api = new Elysia({ prefix: "/api" })
  .use(ikamahRoute)
  .use(settingsRoute)
  .use(ramadanRoute)
  .use(prayerTimeRoute)
  .use(noticeRoute);

export default api;
