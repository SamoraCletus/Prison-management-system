const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  profilePic: String,
  email: String,
  name: String,
  inmateName: String,
  token: String,
  password: String,
  createdAt: String,
});
module.exports = model("User", userSchema);
