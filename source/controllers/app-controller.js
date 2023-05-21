const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const { createFolder, deleteFolder } = require("../services/app-service");

module.exports = {
  createFolder: async (request, response) => {
    try {
      const { ip } = request;
      const { data, status, code, message } = await createFolder(ip);
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
  deleteFolder: async (request, response) => {
    try {
      const { ip } = request;
      const { data, status, code, message } = await deleteFolder(ip);
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
};
