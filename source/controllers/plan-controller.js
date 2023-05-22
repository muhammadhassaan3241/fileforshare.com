const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  getPlan,
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require("../services/plan-service");

module.exports = {
  status: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getPlan(query, ip);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      console.log(error);
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },

  plans: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getPlans(query, ip);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      console.log(error);
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },

  create: async (request, response) => {
    try {
      const { body, ip } = request;
      const { data, status, code, message } = await createPlan(body, ip);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      console.log({ error });
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },

  update: async (request, response) => {
    try {
      const { body, ip } = request;
      const { data, status, code, message } = await updatePlan(body, ip);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      console.log({ error });
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },

  remove: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await deletePlan(query, ip);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      console.log({ error });
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },
};
