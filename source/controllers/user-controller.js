const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../services/user-service");

module.exports = {
  getOne: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getUser(query, ip);
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
      const { data, status, code, message } = await getUsers(query, ip);
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
      const { data, status, code, message } = await createUser(body, ip);
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
      const { data, status, code, message } = await updateUser(query, body, ip);
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
      const { data, status, code, message } = await deleteUser(query, ip);
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
