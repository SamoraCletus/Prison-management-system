const { model, Schema } = require("mongoose");
const exconvictSchema = new Schema({
  name: String,
  profilePic: String,
  age: String,
  createdAt: String,
  address: String,
  nextOfKin: String,
  nextOfKinPhone: String,
  crime: String,
  gender: String,
  remarks: String,
  duration: String,
  releaseDate: String,
  courtOfConviction: String,
  stateOfOrigin: String,
  LGA: String,
});
module.exports = model("Exconvict", exconvictSchema);
