exports.logs = (status, message, module) => {
  const log = `log fetched => ${status} :: ${message} in module => ${module}`;
  console.log(log);
};
