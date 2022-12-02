const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    logo: {
      type: String,
    },

    uploaderId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },

    file: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("File", fileSchema);
