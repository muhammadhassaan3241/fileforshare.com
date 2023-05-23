const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { find } = require("../models/folder-model");
const folderRepository = require("../repositories/folder-repository");
const folderSystemRepository = require("../repositories/folder-system-repository");
const userRepository = require("../repositories/user-repository");

module.exports = {
  createFolder: (ip) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (ip === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const checkIfTheUserExists = await userRepository.findUser({ ip });

        if (!checkIfTheUserExists) {
          const checkFolderInAppFolders =
            await folderSystemRepository.getFolders();
          if (!checkFolderInAppFolders.includes(ip)) {
            const createNewFolderInAppFolders =
              await folderSystemRepository.createFolder(ip);

            if (!createNewFolderInAppFolders) {
              resolve({
                data: {},
                status: HttpStatusCodes.badRequest,
                code: HttpStatusCodes.badRequest,
                message: "Error Occur In Creating Storage",
              });
            }

            resolve({
              data: createNewFolderInAppFolders,
              status: HttpStatusCodes.ok,
              code: HttpStatusCodes.ok,
              message: HttpStatusNames.ok,
            });
          }

          resolve({
            data: checkFolderInAppFolders,
            status: HttpStatusCodes.conflict,
            code: HttpStatusCodes.conflict,
            message: "Folder Already Exists",
          });
        }

        // If user is logged in
      } catch (error) {
        console.log({ error });
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  deleteFolder: async (ipAddress) => {
    try {
      if (ipAddress === undefined) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Failed To Fetch IP Address",
        };
      }
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
};
