const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const { apiResponse } = require("../constants/response");
const { verify } = require("jsonwebtoken");
const userRepository = require("../repositories/user-repository");

exports.jwtAuth = async (request, response, next) => {
  try {
    const token =
      request.cookies.auth.split(" ")[1] ||
      request.headers.authorization.split(" ")[1];

    if (!token) {
      return apiResponse(
        response,
        HttpStatusCodes.unauthorized,
        HttpStatusCodes.unauthorized,
        "Access Token Is Missing",
        undefined
      );
    }
    const decodedToken = verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return apiResponse(
        response,
        HttpStatusCodes.unauthorized,
        HttpStatusCodes.unauthorized,
        "You Are Not Permitted To The Resource",
        undefined
      );
    }
    const user = await userRepository.findUser({ email: decodedToken.email });
    if (!user) {
      return apiResponse(
        response,
        HttpStatusCodes.notFound,
        HttpStatusCodes.notFound,
        "Unauthorized User",
        undefined
      );
    }
    request.user = user;
  } catch (error) {
    console.log({ error });
    return apiResponse(
      response,
      HttpStatusCodes.internalServerError,
      HttpStatusCodes.internalServerError,
      HttpStatusNames.internalServerError,
      undefined
    );
  }
};
