const { model, Schema } = require("mongoose");
const adminSchema = new Schema({
  name: String,
  password: String,
});
module.exports = model("Admin", adminSchema);
