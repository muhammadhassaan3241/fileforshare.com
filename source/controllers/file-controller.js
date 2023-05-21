const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const { uploadFiles, writeFile } = require("../services/file-service");

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

  writeFiles: async (request, response) => {
    try {
      const { body, ip } = request;
      const { data, status, code, message } = await writeFile(body, ip);
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
