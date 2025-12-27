const User = require("../model/userSchema");
const Product = require("../model/productSchema");
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

exports.getLuxuryBoysWatches = async (req, res, next) => {
  try {
    // 1️⃣ Not logged in
    if (!req.session.isLoggedIn || !req.session.user) {
      const watches = await Product.find({
        category: "watch",
        gender: "male",   // 👈 luxury filter
        status: "active",
      }).sort({ createdAt: -1 });

      return res.render("User/luxuryBoysWatches", {
        isLoggedIn: false,
        user: null,
        watches,
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

    // 5️⃣ Fetch luxury boys watches
    const watches = await Product.find({
      category: "watch",
      gender: "male",  // 👈 luxury condition
      status: "active",
    }).sort({ createdAt: -1 });

    // 6️⃣ Render page
    res.render("User/luxuryBoysWatches", {
      isLoggedIn: req.session.isLoggedIn,
      user,
      watches,
    });

  } catch (error) {
    console.error("❌ Luxury Boys Watches Error:", error);
    next(error);
  }
};

exports.getLuxuryGirlsWatches = async (req, res, next) => {
  try {
    // 1️⃣ Not logged in
    if (!req.session.isLoggedIn || !req.session.user) {
      const watches = await Product.find({
        category: "watch",
        gender: "female",   // 👈 luxury filter
        status: "active",
      }).sort({ createdAt: -1 });

      return res.render("User/luxuryGirlsWatches", {
        isLoggedIn: false,
        user: null,
        watches,
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

    // 5️⃣ Fetch luxury boys watches
    const watches = await Product.find({
      category: "watch",
      gender: "female",  // 👈 luxury condition
      status: "active",
    }).sort({ createdAt: -1 });

    // 6️⃣ Render page
    res.render("User/luxuryGirlsWatches", {
      isLoggedIn: req.session.isLoggedIn,
      user,
      watches,
    });

  } catch (error) {
    console.error("❌ Luxury Girls Watches Error:", error);
    next(error);
  }
};


exports.getAllGoogles = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "glasses",
      status: "active",
    };

    // 👇 gender filter
    if (gender !== "all") {
      query.gender = gender;
    }

    // ===============================
    // 🔐 NOT LOGGED IN (Guest user)
    // ===============================
    if (!req.session.isLoggedIn || !req.session.user) {
      const Googles = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/luxuryGoogles", {
        Googles,
        selectedGender: gender,
        isLoggedIn: false,
        user: null,
      });
    }

    // ===============================
    // 🔍 FETCH USER
    // ===============================
    const user = await User.findById(req.session.user._id);

    // ❌ USER DELETED / INVALID
    if (!user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // ❌ ONLY USER ROLE ALLOWED
    if (user.role !== "user") {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // ===============================
    // ✅ LOGGED IN USER
    // ===============================
    const Googles = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/luxuryGoogles", {
      Googles,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });

  } catch (error) {
    console.error("❌ Get Googles Error:", error);
    next(error);
  }
};

exports.getAllLuxuryLadiesBags = async (req, res, next) => {
  try {
    // 1️⃣ Not logged in
    if (!req.session.isLoggedIn || !req.session.user) {
      const bags = await Product.find({
        category: "bags",
        gender: "female",   // 👈 luxury filter
        status: "active",
      }).sort({ createdAt: -1 });

      return res.render("User/luxuryGirlsBags", {
        isLoggedIn: false,
        user: null,
        bags,
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

    // 5️⃣ Fetch luxury girls bags
    const bags = await Product.find({
      category: "bags",
      gender: "female",  // 👈 luxury condition
      status: "active",
    }).sort({ createdAt: -1 });

    // 6️⃣ Render page
    res.render("User/luxuryGirlsBags", {
      isLoggedIn: req.session.isLoggedIn,
      user,
      bags,
    });

  } catch (error) {
    console.error("❌ Luxury Girls Bags Error:", error);
    next(error);
  }
}


exports.getAddToCart = async (req, res) => {
  try {
    // 🔐 LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // 👤 USER + CART PRODUCTS
    const user = await User.findById(req.session.user._id)
      .populate("cart.product");

    if (!user) {
      return res.redirect("/login");
    }

    // 🛒 FILTER REMOVED / INACTIVE PRODUCTS
    const cartItems = user.cart.filter(
      (item) => item.product && item.product.status === "active"
    );

    // 💰 CALCULATIONS
    let subtotal = 0;

    const formattedCart = cartItems.map((item) => {
      const price =
        item.product.offerPrice && item.product.offerPrice > 0
          ? item.product.offerPrice
          : item.product.price;

      const total = price * item.quantity;
      subtotal += total;

      return {
        _id: item.product._id,
        title: item.product.title,
        image: item.product.images[0],
        price,
        quantity: item.quantity,
        category: item.product.category,
        gender: item.product.gender,
        sizes: item.product.sizes,
        total,
      };
    });

    // 🚚 SHIPPING (FREE)
    const shipping = 0;

    // 🧮 FINAL TOTAL
    const orderTotal = subtotal + shipping;

    return res.render("user/addToCart", {
      pageTitle: "Your Cart",
      cartItems: formattedCart,
      subtotal,
      shipping,
      orderTotal,
      user: req.session.user,
       isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("Cart page error:", err);
    return res.redirect("/");
  }
};



exports.postAddToCart = async (req, res) => {
  try {
    // 🔐 LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const { productId } = req.body;

    if (!productId) {
      return res.json({
        success: false,
        message: "Product ID missing",
      });
    }

    // 🔍 PRODUCT CHECK
    const product = await Product.findById(productId);
    if (!product || product.status !== "active") {
      return res.json({
        success: false,
        message: "Product not available",
      });
    }

    // 👤 USER
    const user = await User.findById(req.session.user._id);

    // 🔁 ALREADY IN CART
    const exists = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (exists) {
      return res.json({
        success: false,
        message: "Item already in cart",
      });
    }

    // ➕ ADD TO CART
    user.cart.push({
      product: productId,
      quantity: 1,
    });

    await user.save();

    return res.json({
      success: true,
      message: "Added to cart",
    });

  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.posttoggleWishlist = async (req, res) => {
  try {
    // 🔐 Login check
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);
    if (!user || user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { productId } = req.body;

    const index = user.wishlist.findIndex(
      id => id.toString() === productId
    );


    // ❤️ ADD
    if (index === -1) {
      user.wishlist.push(productId);
      await user.save();
      return res.json({ added: true });
    }

    // 🤍 REMOVE
    user.wishlist.splice(index, 1);
    await user.save();
    return res.json({ added: false });

  } catch (err) {
    console.error("❌ Wishlist Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    // 🔐 LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // 👤 FETCH USER
    const user = await User.findById(req.session.user._id)
      .populate({
        path: "wishlist",
        match: { status: "active" }, // only active products
        options: { sort: { createdAt: -1 } },
      });

    // ❌ Invalid user or wrong role
    if (!user || user.role !== "user") {
      return req.session.destroy(() => res.redirect("/login"));
    }

    res.render("User/wishlist", {
      wishlist: user.wishlist || [],
      user,
      isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("❌ Get Wishlist Error:", err);
    next(err);
  }
};
