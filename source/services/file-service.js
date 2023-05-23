const { default: mongoose } = require("mongoose");
const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const fileRepository = require("../repositories/file-repository");
const fileSystemRepository = require("../repositories/file-system-repository");
const userRepository = require("../repositories/user-repository");
const { appFolders } = require("../app");

module.exports = {
  uploadFiles: async (body, files, ipAddress) => {
    try {
      if (ipAddress === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }

      console.log({ files });
      return;
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },

  writeFile: async (body, ip) => {
    try {
      if (ip === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }

      const { text } = body;

      return new Promise((resolve, reject) => {
        fileSystemRepository.writeFile(
          `${appFolders}/${ip}/file user-${ip}.txt`,
          text,
          (response) => {
            if (response && response === undefined) {
              reject({
                data: {},
                status: HttpStatusCodes.badRequest,
                code: HttpStatusCodes.badRequest,
                message: "Error Writing File",
              });
            }
            resolve({
              data: response,
              status: HttpStatusCodes.ok,
              code: HttpStatusCodes.ok,
              message: HttpStatusNames.ok,
            });
          }
        );
      });
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },

  readFile: async (ip) => {
    try {
      if (ip === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }

      return new Promise((resolve, reject) => {
        fileSystemRepository.readFile(
          `${appFolders}/${ip}/file user-${ip}.txt`,
          (error, lines) => {
            if (error) {
              resolve({
                data: {},
                status: HttpStatusCodes.badRequest,
                code: HttpStatusCodes.badRequest,
                message: "Error Reading File",
              });
            } else {
              resolve({
                data: lines,
                status: HttpStatusCodes.ok,
                code: HttpStatusCodes.ok,
                message: HttpStatusNames.ok,
              });
            }
          }
        );
      });
    } catch (error) {
      return {
        data: {},
        status: HttpStatusCodes.internalServerError,
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },

  removeData: async (ip) => {
    try {
      if (ip === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }

      return new Promise((resolve, reject) => {
        const removeFile = fileSystemRepository.removeFile(
          `${appFolders}/${ip}/file user-${ip}.txt`
        );
        if (!removeFile) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Removing Data From File",
          });
        } else {
          resolve({
            data: removeFile,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
      });
    } catch (error) {
      return {
        data: {},
        status: HttpStatusCodes.internalServerError,
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
};
