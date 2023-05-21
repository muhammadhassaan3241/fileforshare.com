const { connect, connection } = require("mongoose");
const { HttpStatusCodes } = require("../constants/http-status");

const dbURL = process.env.MONGO_DB_URL;

connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", (error) => {
  return {
    status: HttpStatusCodes.serviceUnavailable,
    message: "Database Service Unavailable",
  };
});

db.once("open", () => {
  console.error(`Connected to Mongo DB`);
});

module.exports = db;
