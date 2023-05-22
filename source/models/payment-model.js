const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    planId: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    // Additional fields related to payment information
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
