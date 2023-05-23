const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  getSubscription,
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../services/subscription-service");

module.exports = {
  getOne: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getSubscription(query, ip);
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

  getAll: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getSubscriptions(query, ip);
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
      const { body, ipAddress } = request;
      const { data, status, code, message } = await createSubscription(
        body,
        ip
      );
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
      const { query, body, ip } = request;
      const { data, status, code, message } = await updateSubscription(
        query,
        body,
        ip
      );
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
      const { data, status, code, message } = await deleteSubscription(
        query,
        ip
      );
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
