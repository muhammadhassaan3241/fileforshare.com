const { default: mongoose } = require("mongoose");
const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const fileRepository = require("../repositories/file-repository");
const fileSystemRepository = require("../repositories/file-system-repository");
const userRepository = require("../repositories/user-repository");

module.exports = {
  uploadFiles: async (ipAddress) => {
    try {
      if (ipAddress === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }
      const ip = ipAddress.replace(/[:.]/g, "");
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },

  writeFile: async (body, ipAddress) => {
    try {
      if (ipAddress === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }
      const ip = ipAddress.replace(/[:.]/g, "");
      const writeFileinYourFolder =
        await fileSystemRepository.writeFileWithRetry(`app-folders/${ip}/`);
    } catch (error) {}
  },
};
