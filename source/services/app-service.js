const { default: mongoose } = require("mongoose");
const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { find } = require("../models/folder-model");
const folderRepository = require("../repositories/folder-repository");
const folderSystemRepository = require("../repositories/folder-system-repository");
const userRepository = require("../repositories/user-repository");

module.exports = {
  createFolder: async (ipAddress) => {
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
      const getUserFromDatabase = await userRepository.findUser({ ip });
      if (!getUserFromDatabase && getUserFromDatabase === null) {
        const getFolderFromDatabase = await folderRepository.findFolder({
          name: ip,
        });
        if (!getFolderFromDatabase && getFolderFromDatabase === null) {
          const getFolderFromAppFolders =
            await folderSystemRepository.getFolders();
          if (getFolderFromAppFolders.length === 0) {
            const formData = { name: ip };
            const createFolderInDatabase = await folderRepository.createFolder(
              formData
            );
            if (createFolderInDatabase) {
              await folderSystemRepository.createFolder(ip);
              return {
                data: createFolderInDatabase,
                status: HttpStatusCodes.ok,
                code: HttpStatusCodes.ok,
                message: HttpStatusNames.ok,
              };
            }
          }
        }
        return {
          data: getFolderFromDatabase,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "Folder Already Exists",
        };
      } else {
        const getFolderFromDatabase = await folderRepository.findFolder({
          name: ip,
        });
        if (!getFolderFromDatabase && getFolderFromDatabase === null) {
          const getFolderFromAppFolders =
            await folderSystemRepository.getFolders();
          if (getFolderFromAppFolders.length === 0) {
            const formData = { name: ip, owner: getUserFromDatabase._id };
            const createFolderInDatabase = await folderRepository.createFolder(
              formData
            );
            if (createFolderInDatabase) {
              const createFolderInAppFolders =
                await folderSystemRepository.createFolder(ip);
              if (createFolderInAppFolders) {
                return {
                  data: {},
                  status: HttpStatusCodes.badRequest,
                  code: HttpStatusCodes.badRequest,
                  message: "Failed To Create Folder",
                };
              }
              return {
                data: createFolderInDatabase,
                status: HttpStatusCodes.ok,
                code: HttpStatusCodes.ok,
                message: HttpStatusNames.ok,
              };
            }
          }
        }
        return {
          data: getFolderFromDatabase,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "Folder Already Exists",
        };
      }
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
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
      const ip = ipAddress.replace(/[:.]/g, "");
      const getFolderFromDatabase = await folderRepository.findFolder({
        name: ip,
      });
      if (!getFolderFromDatabase && getFolderFromDatabase === null) {
        const getFolderFromAppFolders =
          await folderSystemRepository.getFolders();
        if (getFolderFromAppFolders.length === 0) {
          return {
            data: getFolderFromDatabase,
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Folder Not Found",
          };
        }
      } else {
        const deleteFolderFromDatabase = await folderRepository.deleteFolder(
          getFolderFromDatabase._id
        );
        if (deleteFolderFromDatabase) {
          console.log({ deleteFolderFromDatabase });
          await folderSystemRepository.deleteFolder(ip);
          return {
            data: deleteFolderFromDatabase,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          };
        }
      }
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
};
