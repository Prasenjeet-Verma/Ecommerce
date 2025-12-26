const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

exports.getLogout = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.user) {
    return res.redirect("/login");
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return next(err);
    }

    res.clearCookie("connect.sid"); // ⭐ optional but recommended
    res.redirect("/login");
  });
};

exports.getLogin = (req, res, next) => {
  try {
    res.render("userLoginSignup/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errors: [],
      oldInput: {
        login: "",
        password: "",
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = [
  // 🔹 Username OR Phone
  check("login")
    .trim()
    .notEmpty()
    .withMessage("Username or Phone number is required"),

  // 🔹 Password
  check("password").notEmpty().withMessage("Password is required"),

  // 🔹 MAIN CONTROLLER
  async (req, res) => {
    const errors = validationResult(req);
    const { login, password } = req.body;

    // ❌ Validation errors
    if (!errors.isEmpty()) {
      return res.status(400).render("userLoginSignup/login", {
        pageTitle: "Login",
        isLoggedIn: false,
        errors: errors.array().map((e) => e.msg),
        oldInput: { login, password },
      });
    }

    try {
      // 1️⃣ Find user by username OR phoneNo
      const user = await User.findOne({
        $or: [{ username: login }, { phoneNo: login }],
      });

      if (!user) {
        return res.status(400).render("userLoginSignup/login", {
          pageTitle: "Login",
          isLoggedIn: false,
          errors: ["Invalid username / phone number or password"],
          oldInput: { login, password },
        });
      }

      // 2️⃣ Blocked check
      if (user.userStatus === "suspended") {
        return res.status(403).render("userLoginSignup/login", {
          pageTitle: "Login",
          isLoggedIn: false,
          errors: ["Your account is suspended. Contact admin."],
          oldInput: { login, password },
        });
      }

      // 3️⃣ Password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).render("userLoginSignup/login", {
          pageTitle: "Login",
          isLoggedIn: false,
          errors: ["Invalid username / phone number or password"],
          oldInput: { login, password },
        });
      }

      // 4️⃣ Create session
      req.session.isLoggedIn = true;
      req.session.user = {
        _id: user._id.toString(), // ⭐ FIX (ObjectId issue solved)
        username: user.username,
        role: user.role,
      };

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        return res.redirect("/admin-home");
      }

      return res.redirect("/");
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).render("userLoginSignup/login", {
        pageTitle: "Login",
        isLoggedIn: false,
        errors: ["Something went wrong. Please try again."],
        oldInput: { login, password },
      });
    }
  },
];

exports.getSignup = async (req, res, next) => {
  try {
    if (req.session.isLoggedIn) {
      return res.redirect("/");
    }
    res.render("userLoginSignup/signup", {
      errors: [],
      oldInput: { username: "", phoneNo: "", emailAddress: "", password: "" },
      isLoggedIn: false,
    });
  } catch (err) {
    next(err);
  }
};

exports.postSignup = [
  // 🔹 Username
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error("Username already in use");
      return true;
    }),

  // 🔹 Phone Number
  check("phoneNo")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .custom(async (value) => {
      const user = await User.findOne({ phoneNo: value });
      if (user) throw new Error("Phone number already in use");
      return true;
    }),

  // 🔹 Email
  check("emailAddress")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ emailAddress: value });
      if (user) throw new Error("Email already in use");
      return true;
    }),

  // 🔹 Password
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // 🔹 Confirm Password
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // 🔹 MAIN CONTROLLER
  async (req, res, next) => {
    const errors = validationResult(req);
    const { username, phoneNo, emailAddress, password } = req.body;

    // ❌ Validation Errors
    if (!errors.isEmpty()) {
      return res.status(400).render("userLoginSignup/signup", {
        isLoggedIn: false,
        errors: errors.array().map((e) => e.msg),
        oldInput: { username, phoneNo, emailAddress, password },
      });
    }

    try {
      // 🔐 Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 👤 Create user
      const user = new User({
        username,
        phoneNo,
        emailAddress,
        password: hashedPassword,
        role: "user", // default
        userStatus: "active", // default
      });

      await user.save();

      // ✅ Session create (optional)
      req.session.isLoggedIn = false;
      req.session.user = null;
      res.redirect("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      res.status(500).render("userLoginSignup/signup", {
        isLoggedIn: false,
        errors: ["Something went wrong. Please try again."],
        oldInput: { username, phoneNo, emailAddress, password },
      });
    }
  },
];
