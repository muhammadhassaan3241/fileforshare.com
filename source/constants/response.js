exports.apiResponse = (response, status, code, message, data) => {
  response.status(status).json({
    header: {
      code,
      message,
    },
    body: {
      data,
    },
  });
};
