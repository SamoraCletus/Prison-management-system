const { model, Schema } = require("mongoose");
const guestSchema = new Schema({
  name: String,
  phone: String,
  inmateName: String,
  createdAt: String,
  purpose: String,
  signedOut: Boolean,
});
module.exports = model("Guest", guestSchema);
