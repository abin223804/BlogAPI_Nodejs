const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const ejs = require("ejs");

// const {
//   allowInsecurePrototypeAccess,
// } = require("@handlebars/allow-prototype-access");


aapp.set('view',path.join(__dirname,'views/user'));
app.set('view engine',"ejs");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const Route = require("./route/route")



app.use(express.static(path.join(__dirname, "public")));



app.use('/', Route)












// ! mysql config 

const db = require('./models');

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(5000, () => {
      console.log('Server listening on port 5000');
    });
  } catch (error) {
    console.error('Error occurred while synchronizing the database:', error);
  }
})();
