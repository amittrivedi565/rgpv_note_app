const config = require("./config/config");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { errors } = require("celebrate");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override")

const PORT = config.PORT || 3000;
const HOST = config.HOST;
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("GoodCar"));
app.use(
  session({
    secret: "API",
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized : true

  })
);
app.use(flash());

// CORS + BODY_PARSE
const corsOptions = {
  origin: [], // Add Client URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});
// parse application/json
app.use(bodyparser.json({ limit: "50mb" }));

app.use(methodOverride("_method"))
// Set Static Folder
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set the template engine as ejs
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/index.routes"));

// Handle celebrate error
app.use(errors());

app.use("*", (req, res) => {
  res.status(404).render("../views/404");
});

app.listen(PORT, () => {
  console.log(`Server Connected : http://${HOST}:${PORT}`);
});
