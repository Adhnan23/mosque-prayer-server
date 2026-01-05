import { Ramadan } from "../../db/schema/index.js";

const RamadanValidator = {
  update: (req, res, next) => {
    Ramadan.schema.update.parse(req.body);
    next();
  },
};

export default RamadanValidator;
