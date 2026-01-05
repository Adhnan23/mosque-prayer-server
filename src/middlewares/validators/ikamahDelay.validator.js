import { IkamahDelay } from "../../db/schema/index.js";

const ikamahDelayValidator = {
  update: (req, res, next) => {
    IkamahDelay.schema.update.parse(req.body);
    next();
  },
};

export default ikamahDelayValidator;
