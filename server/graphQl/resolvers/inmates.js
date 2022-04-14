const { UserInputError } = require("apollo-server-errors");
const Inmate = require("../../models/Inmates");
const Exconvict = require("../../models/Exconvicts");
const { validatesRegisterImate } = require("../../utils/validators");
const path = require("path");
const fs = require("fs");
module.exports = {
  Mutation: {
    async addInmate(
      _,
      {
        registerImate: {
          name,
          gender,
          DOB,
          nextOfKin,
          address,
          crime,
          releaseDate,
          nextOfKinPhone,
          stateOfOrigin,
          LGA,
          courtOfConviction,
          picture,
        },
      }
    ) {
      const { valid, errors } = validatesRegisterImate(
        name,
        gender,
        DOB,
        nextOfKin,
        address,
        nextOfKinPhone,
        crime,
        releaseDate,
        stateOfOrigin,
        LGA,
        courtOfConviction
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const inmate = await Inmate.findOne({ name });
      if (inmate) {
        throw new UserInputError("Inmate already exist", {
          errors: {
            name: "Inmate already exist",
          },
        });
      }
      if (!DOB) {
        throw new UserInputError("Inmates must have a date of Birth");
      } else if (new Date().getFullYear() - DOB.slice(0, 4) < 18) {
        throw new UserInputError("Cannot register a Minor", {
          errors: {
            DOB: "Cannot Register a Minor as Inmate",
          },
        });
      }

      // The Upload scalar return a a promise
      let url = await uploadFile(picture);
      async function uploadFile(picture) {
        const { filename, createReadStream } = await picture;
        const fileStream = createReadStream();
        const pathName = path.join(
          __dirname,
          `../../public/images/${filename}`
        );
        await fileStream.pipe(fs.createWriteStream(pathName));
        return {
          url: `http://localhost:5000/images/${filename}`,
        };
      }
      const newInmate = new Inmate({
        name,
        gender,
        age: new Date().getFullYear() - DOB.slice(0, 4),
        profilePic: url.url,
        nextOfKin,
        nextOfKinPhone,
        address,
        crime,
        releaseDate,
        stateOfOrigin,
        LGA,
        courtOfConviction,
        duration: releaseDate.slice(0, 4) - new Date().getFullYear(),
        createdAt: new Date().toISOString(),
      });
      await newInmate.save();
      return newInmate;
    },
    async addExconvict(_, {}) {
      try {
        const inmates = await Inmate.find();
        const exconvict = inmates.filter(
          (inmate) =>
            inmate.releaseDate === new Date().toISOString().split("T")[0]
        );
        if (exconvict.length > 1) {
          let {
            name,
            age,
            gender,
            nextOfKin,
            profilePic,
            nextOfKinPhone,
            address,
            crime,
            releaseDate,
            stateOfOrigin,
            duration,
            remarks,
            LGA,
            courtOfConviction,
          } = exconvict[0];

          const newExconvict = new Exconvict({
            name,
            gender,
            age,
            nextOfKin,
            profilePic,
            nextOfKinPhone,
            address,
            crime,
            releaseDate,
            stateOfOrigin,
            LGA,
            courtOfConviction,
            duration,
            remarks,
            createdAt: new Date().toISOString(),
          });
          await newExconvict.save();
          await exconvict[0].delete();
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateRemarks(_, { name, remarks }) {
      if (remarks.trim() === "") {
        throw new UserInputError("Inmate Remarks cannot be empty");
      }
      const inmate = await Inmate.findOne({ name });
      if (!inmate) {
        throw new UserInputError("Inmate not Found");
      } else {
        inmate.remarks = remarks;
      }
      await inmate.save();
      return inmate;
    },
  },
  Query: {
    async getInmates() {
      try {
        const inmates = await Inmate.find().sort({ createdAt: -1 });
        return inmates;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getInmate(_, { name }) {
      try {
        const inmate = await Inmate.findOne({ name });
        if (inmate) {
          return inmate;
        } else {
          throw new Error("Inmate not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
