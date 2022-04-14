const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const Auth = require("../../utils/Auth");
// const cloudinary = require("cloudinary");
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "5d" }
  );
}

const {
  validatesRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const Inmate = require("../../models/Inmates");

module.exports = {
  Mutation: {
    async login(_, { name, password }) {
      const { errors, valid } = validateLoginInput(name, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ name });
      if (!user) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { name, inmateName, email, password, confirmPassword } }
    ) {
      // validate user data
      const { valid, errors } = validatesRegisterInput(
        name,
        inmateName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // ensure inmate exist
      const inmate = await Inmate.findOne({ name: inmateName });
      if (!inmate) {
        throw new UserInputError("Inmate does not Exist", {
          errors: {
            inmateName: "Inmate dose not exist in Database",
          },
        });
      } else if (inmate.nextOfKin !== name) {
        throw new UserInputError(
          "Cannot register if you are not a next of kin",
          {
            errors: {
              name: "Cannot register if you are not a next of kin",
            },
          }
        );
      }
      // ensure username is unique
      const user = await User.findOne({ name });
      if (user) {
        throw new UserInputError("Name already exist", {
          errors: {
            name: "Name already exist",
          },
        });
      }
      //ensure email is unique
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new UserInputError("Email already exist", {
          errors: {
            email: "Email already exist",
          },
        });
      }
      //hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        inmateName,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
