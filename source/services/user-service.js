const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const userRepository = require("../repositories/user-repository");

module.exports = {
  login: (body, ip) => {
    return new Promise(async (resolve) => {
      try {
        const { email, password } = body;
        if (
          Object.keys(body).length === 0 ||
          body === null ||
          body === undefined
        ) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Body Cannot Be Empty",
          });
        }

        const findUser = await userRepository.findUser({ email, password });

        if (findUser === null || Object.keys(findUser).length === 0) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Credentials",
          });
        }

        findUser.ipAddress = ip;
        await findUser.save();

        resolve({
          data: findUser,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        });
      } catch (error) {
        resolve({
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },

  signUp: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, email, password } = body;

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

        const ip = ipAddress.replace(/[:.]/g, "");

        const findUser = await userRepository.findUser({ email });

        if (findUser === null || Object.keys(findUser).length === 0) {
          const formData = { ip, name, email, password };
          const createUser = await userRepository.createUser(formData);

          if (createUser === null || Object.keys(createUser).length === 0) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: HttpStatusNames.badRequest,
            });
          }

          resolve({
            data: createUser,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }

        resolve({
          data: {},
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This Email Is Not Available",
        });
      } catch (error) {
        resolve({
          code: HttpStatusCodes.internalServerError,
          message: HttpStatusNames.internalServerError,
        });
      }
    });
  },
};
