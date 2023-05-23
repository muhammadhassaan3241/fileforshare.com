const { Schema, model } = require("mongoose");

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Folder = model("Folder", folderSchema);
module.exports = Folder;
