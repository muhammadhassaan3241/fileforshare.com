const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const { createFolder, deleteFolder } = require("../services/app-service");
const { readFile } = require("../services/file-service");

module.exports = {
  createFolder: async (request, response) => {
    try {
      const { ipAddress } = request;
      console.log({ ipAddress });
      await createFolder(ipAddress);
      const { data, status, code, message } = await readFile(ipAddress);
      response.render("index.hbs", { readFile: data });
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
