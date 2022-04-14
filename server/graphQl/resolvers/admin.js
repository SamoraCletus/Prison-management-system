const { UserInputError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const {
  validateAdminLoginInput,
  validatesRegisterGuest,
} = require("../../utils/validators");
const Admin = require("../../models/Admin");
const Guest = require("../../models/Guests");
const { SECRET_KEY } = require("../../config");
const Inmate = require("../../models/Inmates");

function generateToken(admin) {
  return jwt.sign(
    {
      name: admin.name,
    },
    SECRET_KEY,
    { expiresIn: "5d" }
  );
}
module.exports = {
  Mutation: {
    async adminLogin(_, { name, password }) {
      const { errors, valid } = validateAdminLoginInput(name, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const admin = await Admin.findOne({ name });
      if (!admin) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      } else if (admin.password !== password) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      }
      const token = generateToken(admin);
      return {
        ...admin._doc,
        token,
      };
    },
    async addGuest(_, { registerGuest: { name, phone, inmateName, purpose } }) {
      const { valid, errors } = validatesRegisterGuest(
        name,
        phone,
        inmateName,
        purpose
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const inmate = await Inmate.findOne({ name: inmateName });
      if (!inmate) {
        throw new UserInputError("Inmate does not Exist", {
          errors: {
            inmateName: "Inmate dose not exist in Database",
          },
        });
      }
      // phone = JSON.stringify(phone);
      const newGuest = new Guest({
        name,
        phone,
        inmateName,
        purpose,
        signedOut: false,
        createdAt: new Date().toISOString(),
      });
      await newGuest.save();
      return "Guest Signed In Successfully";
    },
    async signOutGuest(_, { name }) {
      const guest = await Guest.findOne({ name });
      if (!guest) {
        throw new UserInputError("Guest does not Exist", {
          errors: {
            guest: "Guest dose not exist in Database",
          },
        });
      }
      if (guest.signedOut === true) {
        throw new UserInputError("Guest already signed out", {
          errors: {
            guest: "Guest signed out from system",
          },
        });
      } else {
        guest.signedOut = true;
      }
      await guest.save();
      return "Guest Signed Out Successfully";
    },
  },
  Query: {
    async getGuests() {
      try {
        const guests = await Guest.find();
        return guests;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSignedInGuest() {
      const guests = await Guest.find();
      try {
        if (guests) {
          guest = guests.filter((guest) => guest.signedOut === false);
        }
        return guest;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
