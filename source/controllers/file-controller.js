const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const {
  uploadFiles,
  writeFile,
  readFile,
  removeData,
} = require("../services/file-service");

module.exports = {
  uploadFiles: async (request, response) => {
    try {
      const { body, files, ip } = request;
      const { data, status, code, message } = await uploadFiles(
        body,
        files,
        ip
      );
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

  writeFile: async (request, response) => {
    try {
      const { body, ipAddress } = request;
      await writeFile(body, ipAddress);
      return response.redirect("/api/home");
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

  readFile: async (request, response) => {
    try {
      const { ipAddress } = request;
      const { data, status, code, message } = await readFile(ipAddress);
      // return apiResponse(response, status, code, message, data);
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

  removeDataFromFile: async (request, response) => {
    try {
      const { ipAddress } = request;
      await removeData(ipAddress);
      return response.redirect("/api/home");
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
