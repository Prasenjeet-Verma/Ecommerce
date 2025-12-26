const User = require("../model/userSchema");

exports.getHome = async (req, res, next) => {
  try {
    // 1️⃣ Not logged in
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.render("User/home", {
        isLoggedIn: false,
        user: null,
      });
    }

    // 2️⃣ Fetch user
    const user = await User.findById(req.session.user._id);

    // 3️⃣ Invalid / deleted user
    if (!user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // 4️⃣ Only USER role allowed
    if (user.role !== "user") {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // 5️⃣ Success
    res.render("User/home", {
      isLoggedIn: req.session.isLoggedIn,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
