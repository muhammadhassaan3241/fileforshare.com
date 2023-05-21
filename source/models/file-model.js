const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    files: [
      {
        filename: {
          type: String,
          required: true,
        },
        originalName: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        mimeType: {
          type: String,
          required: true,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    // Additional fields based on your requirements
  },
  {
    timestamps: true,
  }
);

const File = model("File", fileSchema);

module.exports = File;
