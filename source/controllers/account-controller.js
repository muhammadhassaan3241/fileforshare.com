const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  login,
  signUp,
  forgotPassword,
  resetPassword,
} = require("../services/account-service");

module.exports = {
  login: async (request, response) => {
    try {
      const { body, ipAddress } = request;
      const { data, status, code, message } = await login(body, ipAddress);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },
  signUp: async (request, response) => {
    try {
      const { body, ipAddress } = request;
      const { data, status, code, message } = await signUp(body, ipAddress);
      return apiResponse(response, status, code, message, data);
    } catch (error) {
      return apiResponse(
        response,
        HttpStatusCodes.badRequest,
        HttpStatusCodes.badRequest,
        HttpStatusNames.badRequest,
        undefined
      );
    }
  },
  forgotPassword: async (request, response) => {
    try {
    } catch (error) {
      throw new Error(`error forgetting user password => ${error.message}`);
    }
  },
  resetPassword: async (request, response) => {
    try {
    } catch (error) {
      throw new Error(`error resetting user password => ${error.message}`);
    }
  },
};
