const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { transporter } = require("../helpers/mail-sender");
const userRepository = require("../repositories/user-repository");
module.exports = {
  login: async (body, ip) => {
    try {
      const { email, password } = body;
      if (
        Object.keys(body).length === 0 ||
        body === null ||
        body === undefined
      ) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body Cannot Be Empty",
        };
      }
      const findUser = await userRepository.findUser({ email, password });
      if (findUser === null || Object.keys(findUser).length === 0) {
        return {
          data: {},
          status: HttpStatusCodes.notFound,
          code: HttpStatusCodes.notFound,
          message: `Invalid Credentials`,
        };
      }
      findUser.ipAddress = ip;
      await findUser.save();
      return {
        data: findUser,
        status: HttpStatusCodes.ok,
        code: HttpStatusCodes.ok,
        message: HttpStatusNames.ok,
      };
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
  signUp: async (body, ipAddress) => {
    try {
      const { name, email, password } = body;
      if (
        Object.keys(body).length === 0 ||
        body === null ||
        body === undefined
      ) {
        return {
          data: null,
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body Cannot Be Empty",
        };
      }
      const ip = ipAddress.replace(/[:.]/g, "");
      const findUser = await userRepository.findUser({ email });
      if (findUser === null || Object.keys(findUser).length === 0) {
        const formData = { ip, name, email, password };
        const createUser = await userRepository.createUser(formData);
        if (createUser === null || Object.keys(createUser).length === 0) {
          return {
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: HttpStatusNames.badRequest,
          };
        }
        return {
          data: createUser,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        };
      }
      return {
        data: {},
        status: HttpStatusCodes.conflict,
        code: HttpStatusCodes.conflict,
        message: `Email Already Exists In The Database`,
      };
    } catch (error) {
      return {
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
  forgotPassword: async () => {
    try {
      const { email } = body;
      if (
        Object.keys(body).length === 0 ||
        body === null ||
        body === undefined
      ) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body Cannot Be Empty",
        };
      }
      const findUser = await userRepository.findUser({ email });
      if (findUser === null || Object.keys(findUser).length === 0) {
        return {
          data: {},
          status: HttpStatusCodes.notFound,
          code: HttpStatusCodes.notFound,
          message: HttpStatusNames.notFound,
        };
      }
      const formData = { email };
      return {
        data: {},
        status: HttpStatusCodes.conflict,
        code: HttpStatusCodes.conflict,
        message: `Email Already Exists In The Database`,
      };
    } catch (error) {
      throw new Error();
    }
  },
  resetPassword: async () => {
    try {
    } catch (error) {
      throw new Error();
    }
  },
};
