const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const Plan = require("../models/plan-model");

class PlanRepository {
  async createPlan(planData) {
    try {
      const newPlan = await Plan.create(planData);
      return newPlan;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  }

  async findPlan(query) {
    try {
      const plan = await Plan.findOne(query);
      return plan;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async findPlans(query) {
    try {
      const plans = await Plan.find(query);
      return plans;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async updatePlan(query, updatedData) {
    try {
      const updatedplan = await Plan.findOneAndUpdate(query, updatedData, {
        new: true,
      });
      return updatedplan;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }

  async deletePlan(query) {
    try {
      const deletedSubscription = await Plan.findOneAndDelete(query);
      return deletedSubscription;
    } catch (error) {
      console.log({ error });
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusCodes.internalServerError,
      };
    }
  }
}

const planRepository = new PlanRepository();
module.exports = planRepository;
