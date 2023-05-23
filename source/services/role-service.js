const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const roleRepository = require("../repositories/role-repository");
const permissionRepository = require("../repositories/permission-repository");

module.exports = {
  getRole: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, populate } = query;
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

        const getSpecificRole = await roleRepository.findRole(
          { name },
          populate
        );
        if (!getSpecificRole) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          });
        }
        resolve({
          data: getSpecificRole,
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

  getRoles: (query, ipAddress) => {
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

        const getAllRoles = await roleRepository.findRoles(null);
        if (!getAllRoles) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Role Not Found",
          });
        }
        resolve({
          data: getAllRoles,
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

  createRole: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, permissions } = body;
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

        const checkIfTheRoleExists = await roleRepository.findRole({ name });
        if (!checkIfTheRoleExists) {
          if (!permissions) {
            const formData = {
              name,
            };
            const createNewRole = await roleRepository.createRole(formData);
            if (!createNewRole) {
              resolve({
                data: {},
                status: HttpStatusCodes.badRequest,
                code: HttpStatusCodes.badRequest,
                message: "Error Occur In Creating Role",
              });
            }
            resolve({
              data: createNewRole,
              status: HttpStatusCodes.ok,
              code: HttpStatusCodes.ok,
              message: HttpStatusNames.ok,
            });
          }
          const getThePermissions = await permissionRepository.findPermissions({
            name: { $in: permissions },
          });
          if (!getThePermissions) {
          }
          const permissionsArray = [];
          getThePermissions.map((perm) => {
            permissionsArray.push({
              _id: perm._id,
              name: perm.name,
            });
          });
          const formData = {
            name,
            permissions: permissionsArray,
          };
          const createNewRole = await roleRepository.createRole(formData);
          if (!createNewRole) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error Occur In Creating Role",
            });
          }
          resolve({
            data: createNewRole,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
        resolve({
          data: checkIfTheRoleExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This Role Already Exists",
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

  updateRole: (query, body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name } = query;
        const { permissions } = body;
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

        const checkIfTheRoleIsValid = await roleRepository.findRole({ name });
        if (!checkIfTheRoleIsValid) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          });
        }
        const checkIfTheRoleExists = await roleRepository.findRole({
          name: body.name,
        });
        if (!checkIfTheRoleExists) {
          if (!permissions) {
            const checkRoleAndUpdate = await roleRepository.updateRole(
              { name },
              { name: body.name }
            );
            if (!checkRoleAndUpdate) {
              resolve({
                data: {},
                status: HttpStatusCodes.notFound,
                code: HttpStatusCodes.notFound,
                message: "Error Occur In Creating Role",
              });
            }
            resolve({
              data: checkRoleAndUpdate,
              status: HttpStatusCodes.ok,
              code: HttpStatusCodes.ok,
              message: HttpStatusNames.ok,
            });
          }
          const getThePermissions = await permissionRepository.findPermissions({
            name: { $in: permissions },
          });
          if (!getThePermissions) {
            resolve({
              data: {},
              status: HttpStatusCodes.notFound,
              code: HttpStatusCodes.notFound,
              message: "Invalid Permission Name",
            });
          }
          const permissionsArray = [];
          getThePermissions.map((perm) => {
            permissionsArray.push({
              _id: perm._id,
              name: perm.name,
            });
          });
          const formData = {
            name: body.name,
            permissions: permissionsArray,
          };
          const checkRoleAndUpdate = await roleRepository.updateRole(
            { name },
            formData
          );
          if (!checkRoleAndUpdate) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error Occur In Creating Role",
            });
          }
          resolve({
            data: checkRoleAndUpdate,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
        resolve({
          data: checkIfTheRoleExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This Role Already Exists",
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

  deleteRole: (query, ipAddress) => {
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

        const checkRoleAndDelete = await roleRepository.deleteRole({
          name,
        });
        if (!checkRoleAndDelete) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          });
        }
        resolve({
          data: checkRoleAndDelete,
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
