exports.retrieveIPMiddleware = async (req, res, next) => {
  const ipAddress = req.clientIp;
  console.log(ipAddress);
  // req.ipAddress = ipAddress.data;
  next();
};
