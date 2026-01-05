import createHttpError from "http-errors";
import { IkamahDelayServices } from "../db/services/index.js";
import { respondSender } from "../utils/respond.js";

const IkamahDelayController = {
  get: async (req, res) => {
    const data = await IkamahDelayServices.get();
    if (!data)
      throw createHttpError(500, "Unable To Fetch Ikamah Try Again Later");
    respondSender(res, true, 200, "Ikamah Fetched", data);
  },
  update: async (req, res) => {
    const data = await IkamahDelayServices.update(req.body);
    if (!data)
      throw createHttpError(500, "Unable To Update Ikamah Try Again Later");
    respondSender(res, true, 200, "Ikamah Updated", data);
  },
};

export default IkamahDelayController;
