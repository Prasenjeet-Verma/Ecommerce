const User = require("../model/userSchema");
const Product = require("../model/productSchema");
const Order = require("../model/orderSchema");
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
        gender: "male", // 👈 luxury filter
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
      gender: "male", // 👈 luxury condition
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
        gender: "female", // 👈 luxury filter
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
      gender: "female", // 👈 luxury condition
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

exports.getAdidasProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 Adidas shoes
      brand: "ADIDAS", // 👟 Adidas brand filter
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
      const adidasProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/adidasProducts", {
        products: adidasProducts,
        selectedGender: gender,
        isLoggedIn: false,
        user: null,
      });
    }

    // ===============================
    // 🔍 FETCH USER
    // ===============================
    const user = await User.findById(req.session.user._id);

    // ❌ USER DELETED
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
    const adidasProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/adidasProducts", {
      products: adidasProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Adidas Products Error:", error);
    next(error);
  }
};

exports.getAllLuxuryLadiesBags = async (req, res, next) => {
  try {
    // 1️⃣ Not logged in
    if (!req.session.isLoggedIn || !req.session.user) {
      const bags = await Product.find({
        category: "bags",
        gender: "female", // 👈 luxury filter
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
      gender: "female", // 👈 luxury condition
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
};

exports.getAddToCart = async (req, res) => {
  try {
    // 🔐 LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // 👤 USER + CART PRODUCTS
    const user = await User.findById(req.session.user._id).populate(
      "cart.product"
    );

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

    return res.render("User/addToCart", {
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

    const index = user.wishlist.findIndex((id) => id.toString() === productId);

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
    const user = await User.findById(req.session.user._id).populate({
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

exports.getViewProduct = async (req, res, next) => {
  try {
    // 🔐 LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const productId = req.params.id;

    // 🔍 PRODUCT FETCH
    const product = await Product.findById(productId);

    if (!product || product.status !== "active") {
      return res.redirect("/"); // or 404 page
    }

    // 👤 USER (for cart check)
    const user = await User.findById(req.session.user._id);

    const isInCart = user.cart.some(
      (item) => item.product.toString() === productId
    );

    res.render("User/view-product", {
      pageTitle: product.title,
      product,
      isInCart,
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    console.error("View product error:", err);
    next(err);
  }
};


exports.postBuyNowOrder = async (req, res) => {
  try {
    const { productId, qty, name, mobile, address, pincode, state, paymentMethod, size } = req.body;
    const userId = req.session.user._id;

    const product = await Product.findById(productId);

    if (!product || product.status !== "active") {
      return res.send("Product not available");
    }

    if (product.totalStock < qty) {
      return res.send("Out of stock");
    }

    // ✅ Only require size if product is shoes
    if (product.category === "shoes" && !size) {
      return res.status(400).send("Size is required for shoes");
    }

    const price = product.offerPrice;
    const totalAmount = price * qty;

    // ===========================
    // 💵 ONLINE PAYMENT
    // ===========================
    if (paymentMethod === "ONLINE") {
      req.session.tempOrder = {
        user: userId,
        product: productId,
        qty,
        size,   // optional for non-shoes
        price,
        totalAmount,
        name,
        mobile,
        address,
        pincode,
        state,
      };

      return res.send("ONLINE payment gateway integration pending");
    }

    // ===========================
    // 🚚 CASH ON DELIVERY
    // ===========================
    const result = await Product.updateOne(
      { _id: productId, totalStock: { $gte: qty } },
      { $inc: { totalStock: -qty } }
    );

    if (result.modifiedCount === 0) {
      return res.send("Out of stock");
    }

    const order = await Order.create({
      user: userId,
      product: productId,
      qty,
      size: product.category === "shoes" ? size : null,  // save size only for shoes
      price,
      totalAmount,
      name,
      mobile,
      address,
      pincode,
      state,
      paymentMethod: paymentMethod === "COD" ? "COD" : "ONLINE",
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Confirmed",
    });

    res.redirect("/order-success/" + order._id);

  } catch (err) {
    console.error(err);
    res.send("Order failed");
  }
};


exports.getOrderSuccess = async (req, res) => {
  try {
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const order = await Order.findById(req.params.id).populate("product");

    if (!order || order.user.toString() !== req.session.user._id.toString()) {
      return res.redirect("/");
    }

    res.render("User/orderSuccess", {
      order,
      user: req.session.user,
      isLoggedIn: true
    });

  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
