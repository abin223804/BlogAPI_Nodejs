const express = require('express');
const route = express();
const controller = require('../controller/controller');
const multer = require('../util/multer')
const session = require('express-session');
const Auth = require('../middleware/Auth')


route.use(
    session({
      secret: "ijuytrdsfxcgvhbj",
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );



route.get('/',Auth.isLogin,controller.loadHome);
route.get('/login',Auth.isLogout,controller.loadLogin);
route.get('/register',Auth.isLogout,controller.loadRegister);
route.get('/blog',Auth.isLogin,controller.loadBlog);
route.get('/addBlog',Auth.isLogin,controller.loadAddBlog);
route.get('/showblog',Auth.isLogin,controller.showBlog);
route.get('/deleteblog',Auth.isLogin,controller.deleteBlog);
route.get('/updateblog',Auth.isLogin,controller.editBlog);


// ! post request


route.post('/register',controller.registerUser);
route.post('/login',controller.verifyUserLogin);
route.post('/addBlog',Auth.isLogin,multer.upload,controller.addBlog)
route.post('/updateblog',Auth.isLogin,controller.updateblog)




module.exports = route