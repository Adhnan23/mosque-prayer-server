import { PrayerTimeController } from "@controllers";
import { PrayerTimeValidator } from "@validators";
import Elysia from "elysia";

const PrayerTimeRoute = new Elysia({ prefix: "/prayer" })
  .get("/", PrayerTimeController.getAll, PrayerTimeValidator.getAll)
  .get(
    "/:month",
    PrayerTimeController.getMonthly,
    PrayerTimeValidator.getMonthly
  )
  .get("/:month/:day", PrayerTimeController.get, PrayerTimeValidator.get)
  .get(
    "range/:sm/:sd/:em/:ed",
    PrayerTimeController.getInRange,
    PrayerTimeValidator.getInRange
  )
  .get("/today", PrayerTimeController.today, PrayerTimeValidator.today)
  .put("/:month/:day", PrayerTimeController.update, PrayerTimeValidator.update)
  .put(
    "range/:sm/:sd/:em/:ed",
    PrayerTimeController.updateByRange,
    PrayerTimeValidator.updateByRange
  );

export default PrayerTimeRoute;
