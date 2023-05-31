const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");




const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const Route = require("./route/route")

Route.set("views", path.join(__dirname, "view/user"));
Route.set("view engine", "hbs");
Route.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "Layout",
    layoutsDir: __dirname + "/view/Layout",
    partialsDir: __dirname + "/view/partials",
  })
);

app.use(express.static(path.join(__dirname, "public")));



app.use('/', Route)












// ! mysql config 

const db = require('./models');

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(4000, () => {
      console.log('Server listening on port 4000');
    });
  } catch (error) {
    console.error('Error occurred while synchronizing the database:', error);
  }
})();
