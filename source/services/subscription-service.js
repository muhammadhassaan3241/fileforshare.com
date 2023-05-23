const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const subscriptionRepository = require("../repositories/subscription-repository");
const userRepository = require("../repositories/user-repository");
const planRepository = require("../repositories/plan-repository");

module.exports = {
  getSubscription: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { email } = query;
        if (
          Object.keys(query).length === 0 ||
          query === null ||
          query === undefined
        ) {
          resolve({
            data: {},
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

        const checkIfTheUserIsvalid = await userRepository.findUser({ email });
        if (!checkIfTheUserIsvalid) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid User Email",
          });
        }
        const checkUserSubscription =
          await subscriptionRepository.findSubscription({
            userId: checkIfTheUserIsvalid._id,
          });
        if (!checkUserSubscription) {
          resolve({
            data: checkIfTheUserIsvalid,
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "This User Is Not Subscribed",
          });
        }
        resolve({
          data: checkUserSubscription,
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

  getSubscriptions: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { type, name } = query;
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const getPlan = await planRepository.findPlans({ name: plan });
        if (!getPlan) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Plane Name",
          });
        }
        const getAllSubscriptions =
          await subscriptionRepository.findSubscriptions({
            $or: [{ name }, { type }],
          });
        if (!getAllSubscriptions) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Subscriptions Not Found",
          });
        }
        resolve({
          data: getAllSubscriptions,
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

  createSubscription: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, email, password, role } = body;
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

        const checkIfTheSubscriptionExists =
          await subscriptionRepository.findSubscription({
            name,
          });
        if (!checkIfTheSubscriptionExists) {
          if (!role) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Role Is Required",
            });
          }
          const getTheSpecificRole = await planRepository.findRole({
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
            name,
            email,
            password,
            role: getTheSpecificRole._id,
          };
          const createNewSubscription =
            await subscriptionRepository.createSubscription(formData);
          if (!createNewSubscription) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error Occur In Creating Subscription",
            });
          }
          resolve({
            data: createNewSubscription,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
        resolve({
          data: checkIfTheSubscriptionExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This Subscription Already Exists",
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

  updateSubscription: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, password, role } = body;
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

        if (!role) {
          if (!role) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Role Is Required",
            });
          }
          const getTheSpecificRole = await planRepository.findRole({
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
            name,
            password,
            role: getTheSpecificRole._id,
          };
          const checkSubscriptionAndUpdate =
            await subscriptionRepository.updateSubscription({ name }, formData);
          if (!checkSubscriptionAndUpdate) {
            resolve({
              data: {},
              status: HttpStatusCodes.notFound,
              code: HttpStatusCodes.notFound,
              message: "Invalid Subscription Name",
            });
          }
          resolve({
            data: checkSubscriptionAndUpdate,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        }
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

  deleteSubscription: (query, ipAddress) => {
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

        const checkSubscriptionAndDelete =
          await subscriptionRepository.deleteSubscription({
            email,
          });
        if (!checkSubscriptionAndDelete) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Subscription Name",
          });
        }
        resolve({
          data: checkSubscriptionAndDelete,
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
