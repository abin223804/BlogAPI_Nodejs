const { User, Blog } = require("../models");

// const {} = require("../models");

const bcrypt = require("bcrypt");

const loadLogin = (req, res) => {
  res.render("login");
};

const loadRegister = (req, res) => {
  res.render("register");
};

const loadBlog = async (req, res) => {
  const blogs = await Blog.findAll();

  res.render("blog", { blog: blogs });
};

const loadAddBlog = (req, res) => {
  res.render("addBlog");
};
const loadHome = (req, res) => {
  res.render("home");
};

const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
      }).then((userInfo) => {
        console.log(userInfo);
      });

      res.redirect("/");
    } else {
      res.render("login", { message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    console.log(user, "userfound");

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user_id = user.email

        res.redirect("/");
      } else {
        res.send("password mismatch");
      }
    } else {
      res.send("user not found");
    }
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    res.send("An error occurred");
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const blog = await Blog.create({
      title: title,
      content: content,
      imagePath: req.file.filename,
      author: author,
    });

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
};

const showBlog = async (req, res, next) => {
  //   const blog = await Blog.findOne({ where: { id: id } });

  const id = req.query.id;

  const blog = await Blog.findByPk(id);

  res.render("showBlog", { blog });
};

const deleteBlog = async (req, res) => {
  const id = req.query.id;

  await Blog.destroy({ where: { id: id } });

  res.redirect("/blog");
};

const editBlog = async (req, res) => {
  const id = req.query.id;

  const blog = await Blog.findByPk(id);

  res.render("editBlog", { blog: blog });
};

const updateblog = async (req, res) => {
  try {
    const { title, content, author, blogId } = req.body;
    const image = req.file;



    console.log(req.body,'body');

    if (image) {
      const updatedBlog = await Blog.update(
        {
          title: title,
          content: content,
          author: author,
        },
        { where: { id: blogId } }
      );
    } else {
      const updatedBlog = await Blog.update(
        {
          title: title,
          content: content,
          author: author,
        },
        { where: { id: blogId } }
      );
    }

    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateblog,
  editBlog,
  deleteBlog,
  loadAddBlog,
  loadBlog,
  loadLogin,
  loadRegister,
  addBlog,
  loadHome,
  registerUser,
  verifyUserLogin,
  showBlog,
};
