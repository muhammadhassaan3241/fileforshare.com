const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  getPermission,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../services/permission-service");

module.exports = {
  getOne: async (request, response) => {
    try {
      const { query, ip } = request;
      const { data, status, code, message } = await getPermission(query, ip);
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
      const { data, status, code, message } = await getPermissions(query, ip);
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
      const { data, status, code, message } = await createPermission(body, ip);
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
      const { data, status, code, message } = await updatePermission(
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
      const { data, status, code, message } = await deletePermission(query, ip);
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
