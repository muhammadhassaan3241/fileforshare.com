const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const permissionRepository = require("../repositories/permission-repository");

module.exports = {
  getPermission: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = query;
        if (
          Object.keys(query).length === 0 ||
          query === null ||
          query === undefined
        ) {
          resolve({
            data: null,
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Query Cannot Be Empty",
          });
        }
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const getSpecificPermission = await permissionRepository.findPermission(
          { name }
        );
        if (!getSpecificPermission) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Permission Name",
          });
        }
        resolve({
          data: getSpecificPermission,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
      } catch (error) {
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  getPermissions: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = query;
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const getAllPermissions = await permissionRepository.findPermissions(
          null
        );
        if (!getAllPermissions) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Permission Not Found",
          });
        }
        resolve({
          data: getAllPermissions,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
      } catch (error) {
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  createPermission: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = body;
        if (
          Object.keys(body).length === 0 ||
          body === null ||
          body === undefined
        ) {
          resolve({
            data: null,
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Body Cannot Be Empty",
          });
        }
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const checkIfThePermissionExists =
          await permissionRepository.findPermission({ name });
        if (!checkIfThePermissionExists) {
          const formData = {
            name,
          };
          const createNewPermission =
            await permissionRepository.createPermission(formData);
          if (!createNewPermission) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error Occur In Creating Permission",
            });
          }
          resolve({
            data: createNewPermission,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
        resolve({
          data: checkIfThePermissionExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This Permission Already Exists",
        });
      } catch (error) {
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  updatePermission: (query, body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = query;
        if (
          Object.keys(query).length === 0 ||
          query === null ||
          query === undefined
        ) {
          resolve({
            data: null,
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Query Cannot Be Empty",
          });
        }
        if (
          Object.keys(body).length === 0 ||
          body === null ||
          body === undefined
        ) {
          resolve({
            data: null,
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Body Cannot Be Empty",
          });
        }
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const checkPermissionAndUpdate =
          await permissionRepository.updatePermission(
            { name },
            {
              name: body.name,
            }
          );
        if (!checkPermissionAndUpdate) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Permission Name",
          });
        }
        resolve({
          data: checkPermissionAndUpdate,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
      } catch (error) {
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  deletePermission: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = query;
        if (
          Object.keys(query).length === 0 ||
          query === null ||
          query === undefined
        ) {
          resolve({
            data: null,
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Query Cannot Be Empty",
          });
        }
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const checkPermissionAndDelete =
          await permissionRepository.deletePermission({ name });
        if (!checkPermissionAndDelete) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Permission Name",
          });
        }
        resolve({
          data: checkPermissionAndDelete,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
      } catch (error) {
        resolve({
          data: {},
          status: HttpStatusCodes.internalServerError,
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },
};
