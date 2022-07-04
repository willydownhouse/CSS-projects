const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
  },
});

module.exports = mongoose.model("User", userSchema);
