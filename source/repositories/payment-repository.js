const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const Payment = require("../models/payment-model");

class PaymentRepository {
  async createPayment(paymentData) {
    try {
      const newPayment = await Payment.create(paymentData);
      return newPayment;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  }

  async findPayment(query) {
    try {
      const payment = await payment.findOne(query);
      return payment;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async findPayments(query) {
    try {
      const payment = await payment.find(query);
      return payment;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async updatePayment(query, updatedData) {
    try {
      const updatedPayment = await Payment.findOneAndUpdate(
        query,
        updatedData,
        {
          new: true,
        }
      );
      return updatedPayment;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async deletePayment(query) {
    try {
      const deletedPayment = await Payment.findOneAndDelete(query);
      return deletedPayment;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }
}

const PaymentRepository = new PaymentRepository();
module.exports = PaymentRepository;
