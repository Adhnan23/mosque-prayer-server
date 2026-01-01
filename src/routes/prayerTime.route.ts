import { Elysia } from "elysia";
import { PrayerTimeValidator } from "../middlewares/validator";
import { PrayerTimeController } from "../controllers";

const prayerTimeRoute = new Elysia({ prefix: "/prayer-time" })
  .get("/", PrayerTimeController.getAll, PrayerTimeValidator.getAll)

  .get(
    "/:month",
    PrayerTimeController.getMonthly,
    PrayerTimeValidator.getMonthly
  )
  .get("/:month/:day", PrayerTimeController.get, PrayerTimeValidator.get)
  .get(
    "/range/:startMonth/:startDay/:endMonth/:endDay",
    PrayerTimeController.getInRange,
    PrayerTimeValidator.getInRange
  )
  .get("/today", PrayerTimeController.getToday, PrayerTimeValidator.today)
  .put("/:month/:day", PrayerTimeController.update, PrayerTimeValidator.update)
  .put(
    "/range/:startMonth/:startDay/:endMonth/:endDay",
    PrayerTimeController.updateByRange,
    PrayerTimeValidator.updateByRange
  );

export default prayerTimeRoute;
