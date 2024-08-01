const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
//-------create Schema order------
const sessionSchema = new Schema({
  user_id: { type: String, required: true },
  message: [{ msg: { type: String }, user: { type: Boolean }, _id: false }],
});

//--------exports model-------------
sessionSchema.plugin(AutoIncrement, { inc_field: "RoomNumber" });
module.exports = mongoose.model("Session", sessionSchema);
