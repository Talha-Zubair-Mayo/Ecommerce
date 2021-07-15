const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    catname: {
      type: String,
      required: true,
      trim: true,
     unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
