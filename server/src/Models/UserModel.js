const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      require: true,
      trim: true,
      type: String,
    },
    email: {
      require: true,
      trim: true,
      type: String,
      lowercase: true,
    },
    pass: {
      require: true,
      trim: true,
      type: String,
    },
    role: {
      require: true,
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
