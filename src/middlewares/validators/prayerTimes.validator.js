import { PrayerTime } from "../../db/schema/index.js";

const PrayerTimeValidator = {
  update: (req, res, next) => {
    PrayerTime.schema.update.parse(req.body);
    next();
  },
};

export default PrayerTimeValidator;
