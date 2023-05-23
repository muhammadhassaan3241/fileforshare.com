const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const userRepository = require("../repositories/user-repository");
const roleRepository = require("../repositories/role-repository");

module.exports = {
  getUser: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { email, populate } = query;
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

        const getSpecificUser = await userRepository.findUser(
          { email },
          populate
        );
        if (!getSpecificUser) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid User Email",
          });
        }
        resolve({
          data: getSpecificUser,
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

  getUsers: (query, ipAddress) => {
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

        const getAllUsers = await userRepository.findUsers(null);
        if (!getAllUsers) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "User Not Found",
          });
        }
        resolve({
          data: getAllUsers,
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

  createUser: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { IP, name, email, password, role } = body;
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

        const checkIfTheUserExists = await userRepository.findUser({
          name,
        });
        if (!checkIfTheUserExists) {
          if (!role) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Role Is Required",
            });
          }
          const getTheSpecificRole = await roleRepository.findRole({
            name: role,
          });
          if (!getTheSpecificRole) {
            resolve({
              data: {},
              status: HttpStatusCodes.notFound,
              code: HttpStatusCodes.notFound,
              message: "Invalid Role Name",
            });
          }
          const formData = {
            ip: IP || ip,
            name,
            email,
            password,
            role: getTheSpecificRole._id,
          };
          const createNewUser = await userRepository.createUser(formData);
          if (!createNewUser) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error Occur In Creating User",
            });
          }
          resolve({
            data: createNewUser,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
        resolve({
          data: checkIfTheUserExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This User Already Exists",
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

  updateUser: (query, body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { email } = query;
        const { IP, name, password, role } = body;
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

        const checkIfThisUserIsValid = await userRepository.findUser({ email });
        if (!checkIfThisUserIsValid) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Invalid User Email",
          });
        }
        if (!role) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Role Is Required",
          });
        }
        const getTheSpecificRole = await roleRepository.findRole({
          name: role,
        });
        if (!getTheSpecificRole) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          });
        }
        const formData = {
          ip: IP || ip,
          name,
          password,
          role: getTheSpecificRole._id,
        };
        const checkUserAndUpdate = await userRepository.updateUser(
          { email },
          formData
        );
        if (!checkUserAndUpdate) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Occur In Updating User",
          });
        }
        resolve({
          data: checkUserAndUpdate,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
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

  deleteUser: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { email } = query;
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

        const checkUserAndDelete = await userRepository.deleteUser({
          email,
        });
        if (!checkUserAndDelete) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid User Name",
          });
        }
        resolve({
          data: checkUserAndDelete,
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
