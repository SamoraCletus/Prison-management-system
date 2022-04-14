const { UserInputError } = require("apollo-server-errors");
const Exconvict = require("../../models/Exconvicts");
const { validatesRegisterExconvict } = require("../../utils/validators");
module.exports = {
  Query: {
    async getExconvicts() {
      try {
        const exconvict = await Exconvict.find();
        return exconvict;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getExconvict(_, { name }) {
      try {
        const exconvict = await Exconvict.findOne({ name });
        if (exconvict) {
          return exconvict;
        } else {
          throw new Error("Exconvict not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
