import z from "zod";
import { respondSender } from "../utils/respond.js";
import PrayerTimeServices from "../db/services/prayerTimes.service.js";

const PrayerTimeController = {
  getAll: async (req, res) => {
    const data = await PrayerTimeServices.getAll(req.query.limit);
    if (!data) {
      return respondSender(res, 404, "No prayer times found");
    }
    return respondSender(res, 200, "Prayer times retrieved successfully", data);
  },
  getMonthly: async (req, res) => {
    const data = await PrayerTimeServices.getMonthly(
      req.params.month,
      req.query.limit
    );
    if (!data) {
      return respondSender(
        res,
        404,
        "No prayer times found for the specified month"
      );
    }
    return respondSender(
      res,
      200,
      "Monthly prayer times retrieved successfully",
      data
    );
  },
  get: async (req, res) => {
    const data = await PrayerTimeServices.get(req.params.month, req.params.day);
    if (!data) {
      return respondSender(
        res,
        404,
        "No prayer times found for the specified date"
      );
    }
    return respondSender(
      res,
      200,
      "Prayer times for the specified date retrieved successfully",
      data
    );
  },
  getInRange: async (req, res) => {
    const data = await PrayerTimeServices.getInRange(
      req.params.startMonth,
      req.params.startDay,
      req.params.endMonth,
      req.params.endDay
    );
    if (!data) {
      return respondSender(
        res,
        404,
        "No prayer times found for the specified date range"
      );
    }
    return respondSender(
      res,
      200,
      "Prayer times for the specified date range retrieved successfully",
      data
    );
  },
  getToday: async (req, res) => {
    const today = new Date();
    const data = await PrayerTimeServices.get(
      today.getMonth() + 1,
      today.getDate()
    );
    if (!data) {
      return respondSender(res, 404, "No prayer times found for today");
    }
    return respondSender(
      res,
      200,
      "Today's prayer times retrieved successfully",
      data
    );
  },
};
