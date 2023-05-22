const { Schema, model } = require("mongoose");

// Define the payment schema
const planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Monthly", "Annually"],
    },
    limit: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    price: {
      type: String,
      required: true,
    },
    // Other payment properties...
  },
  {
    timestamps: true,
  }
);

// Create the payment model
const plan = model("Plan", planSchema);

module.exports = plan;
