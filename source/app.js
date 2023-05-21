require("dotenv").config();

require("./databases/mongo-db");

const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.APPLICATION_PORT || 8000;
const appFolders = path.join(__dirname, `app-folders`);
module.exports.appFolders = appFolders;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(appFolders));

const userRoutes = require("./routes/user-routes");
const appRoutes = require("./routes/app-routes");

app.use("/api", userRoutes);
app.use("/api", appRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to server at port => ${port}`);
});
