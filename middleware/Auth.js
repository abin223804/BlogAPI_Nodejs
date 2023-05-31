const session = require("express-session");




const isLogin = async (req, res, next) => {
    if (session.user_id) {
      next()
    }
    else{
      res.redirect("/login");
  
    }
  
  };
  
  const isLogout = (req, res, next) => {
    if (session.user_id) {
      res.redirect("/");
    } else {
      next();
    }
  };
  
  module.exports = {
      isLogin,
      isLogout,
      
  }