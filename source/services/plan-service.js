const {
  HttpStatusCodes,
  HttpStatusNames,
} = require("../constants/http-status");
const planRepository = require("../repositories/plan-repository");

module.exports = {
  getPlan: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, type } = query;
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

        const ip = ipAddress.replace(/[:.]/g, "");
        const plan = await planRepository.findPlan({ name, type });

        if (!plan) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Plan Name",
          });
        }

        resolve({
          data: plan,
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

  getPlans: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, type } = query;
        if (ipAddress === undefined) {
          resolve({
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Failed To Fetch IP Address",
          });
        }

        const ip = ipAddress.replace(/[:.]/g, "");
        const plans = await planRepository.findPlans({
          $or: [{ name }, { type }],
        });
        if (!plans) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "No Plans Found",
          });
        }

        resolve({
          data: plans,
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

  createPlan: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, type, limit, size, price } = body;
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

        const ip = ipAddress.replace(/[:.]/g, "");
        const formData = {
          name,
          type,
          limit,
          size,
          price,
        };

        const checkIfThePlanExists = await planRepository.findPlan({
          name,
          type,
        });

        if (!checkIfThePlanExists) {
          const createPlan = await planRepository.createPlan(formData);

          if (!createPlan) {
            resolve({
              data: {},
              status: HttpStatusCodes.badRequest,
              code: HttpStatusCodes.badRequest,
              message: "Error In Creating Plan",
            });
          }

          resolve({
            data: createPlan,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          });
        } else {
          resolve({
            data: checkIfThePlanExists,
            status: HttpStatusCodes.conflict,
            code: HttpStatusCodes.conflict,
            message: "This Plan Already Exists",
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

  updatePlan: (body, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, type, limit, size, price } = body;
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

        const ip = ipAddress.replace(/[:.]/g, "");
        const formData = {
          name,
          type,
          limit,
          size,
          price,
        };

        const updatePlan = await planRepository.updatePlan(
          { name, type },
          formData
        );

        if (!updatePlan) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Plan Name",
          });
        }

        resolve({
          data: updatePlan,
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

  deletePlan: (query, ipAddress) => {
    return new Promise(async (resolve) => {
      try {
        const { name, type } = query;
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

        const ip = ipAddress.replace(/[:.]/g, "");

        const deletePlan = await planRepository.deletePlan({
          name,
          type,
        });

        if (!deletePlan) {
          resolve({
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Plan Name",
          });
        }

        resolve({
          data: deletePlan,
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
