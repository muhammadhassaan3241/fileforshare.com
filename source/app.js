require("dotenv").config();

require("./databases/mongo-db");

const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const requestIP = require("request-ip");

const app = express();
const port = process.env.APPLICATION_PORT || 8000;
const appFolders = path.join(__dirname, `app-folders`);
const assets = path.join(__dirname, "assets");
const viewsPath = path.join(__dirname, "views");
module.exports.appFolders = appFolders;

const { retrieveIPMiddleware } = require("./middlewares/class-A-IP-middleware");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(appFolders));
app.use(express.static(assets));
app.set("trust proxy", true);
app.use(requestIP.mw());
app.use(retrieveIPMiddleware);

app.set("views", viewsPath);

hbs.registerPartials(viewsPath);
hbs.registerHelper("json", (context) => {
  return JSON.stringify(context);
});

hbs.registerHelper(
  "compare",
  function (leftValue, operator, rightValue, options) {
    const operators = {
      "==": (l, r) => l == r,
      "===": (l, r) => l === r,
      "!=": (l, r) => l != r,
      "!==": (l, r) => l !== r,
      "<": (l, r) => l < r,
      ">": (l, r) => l > r,
      "<=": (l, r) => l <= r,
      ">=": (l, r) => l >= r,
      "&&": (l, r) => l && r,
      "||": (l, r) => l || r,
    };

    if (!operators[operator]) {
      throw new Error(`Compare helper: Unknown operator ${operator}`);
    }

    const result = operators[operator](leftValue, rightValue);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
);

app.set("view engine", "hbs");
app.use("/css", express.static(path.join(assets, "/css")));
app.use("/images", express.static(path.join(assets, "/images")));
app.use("/img", express.static(path.join(assets, "/img")));
app.use("/js", express.static(path.join(assets, "/js")));
app.use("/vendor", express.static(path.join(assets, "/vendor")));
app.use("/resources", express.static(path.join(assets, "/resources")));

const accountRoutes = require("./routes/account-routes");
const userRoutes = require("./routes/user-routes");
const roleRoutes = require("./routes/role-routes");
const permissionRoutes = require("./routes/permission-routes");
const appRoutes = require("./routes/app-routes");
const fileRoutes = require("./routes/file-routes");
const planRoutes = require("./routes/plan-routes");
const subscriptionRoutes = require("./routes/subscription-routes");

app.use("/api", appRoutes);
app.use("/api", accountRoutes);
app.use("/api", userRoutes);
app.use("/api", fileRoutes);
app.use("/api", roleRoutes);
app.use("/api", permissionRoutes);
app.use("/api", planRoutes);
app.use("/api", subscriptionRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to server at port => ${port}`);
});
