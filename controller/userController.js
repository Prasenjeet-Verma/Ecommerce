const User = require("../model/userSchema");
const Product = require("../model/productSchema");
const Order = require("../model/orderSchema");
const uploadToPhpServer = require("../utils/uploadToPhpServer");
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

exports.getAsicsProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 Asics shoes
      brand: "ASICS", // 👟 Asics brand filter
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
      const asicsProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/asicsProducts", {
        products: asicsProducts,
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
    const asicsProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/asicsProducts", {
      products: asicsProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Adidas Products Error:", error);
    next(error);
  }
}

exports.getPumaProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 Puma shoes
      brand: "PUMA", // 👟 Puma brand filter
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
      const pumaProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/pumaProducts", {
        products: pumaProducts,
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
    const pumaProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/pumaProducts", {
      products: pumaProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Adidas Products Error:", error);
    next(error);
  }
}

exports.getHokaProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 Hoka shoes
      brand: "HOKA", // 👟 Hoka brand filter
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
      const hokaProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/hokaProducts", {
        products: hokaProducts,
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
    const hokaProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/hokaProducts", {
      products: hokaProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Adidas Products Error:", error);
    next(error);
  }
}

exports.getNbProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 NB shoes
      brand: "NB", // 👟 NB brand filter
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
      const nbProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/nbProducts", {
        products: nbProducts,
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
    const nbProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/nbProducts", {
      products: nbProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get NB Products Error:", error);
    next(error);
  }
}

exports.getReebokProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "shoes", // 👟 Reebok shoes
      brand: "REEBOK", // 👟 Reebok brand filter
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
      const reebokProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/reebokProducts", {
        products: reebokProducts,
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
    const reebokProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/reebokProducts", {
      products: reebokProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Reebok Products Error:", error);
    next(error);
  }
}




exports.getCrocsProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "crocs", // 👟 Crocs 
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
      const crocsProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/crocsProducts", {
        products: crocsProducts,
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
    const crocsProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/crocsProducts", {
      products: crocsProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Crocs Products Error:", error);
    next(error);
  }
}



exports.getSlidersProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "sliders", // 👟 Crocs 
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
      const slidersProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/slidersProducts", {
        products: slidersProducts,
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
    const slidersProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/slidersProducts", {
      products: slidersProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get Sliders Products Error:", error);
    next(error);
  }
}






exports.getAllShoesProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: { $in: ["shoes", "crocs", "sliders"] }, // 👟 All shoes
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
      const allShoesProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/allShoes", {
        products: allShoesProducts,
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
    const allShoesProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/allShoes", {
      products: allShoesProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get All Shoes Products Error:", error);
    next(error);
  }
}


exports.getAllClothesProducts = async (req, res, next) => {
  try {
    const gender = req.query.gender || "all";

    let query = {
      category: "clothes", // 👟 All clothes
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
      const allClothesProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/allClothes", {
        products: allClothesProducts,
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
    const allClothesProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/allClothes", {
      products: allClothesProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get All Clothes Products Error:", error);
    next(error);
  }
}


exports.getAllGooglesProducts = async (req, res, next) => {
    try {
    const gender = req.query.gender || "all";

    let query = {
      category: "glasses", // 👟 All glasses
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
      const allGooglesProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/allGoogles", {
        products: allGooglesProducts,
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
    const allGooglesProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/allWatches", {
      products: allGooglesProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get All Googles Products Error:", error);
    next(error);
  }
}



exports.getAllWatchesProducts = async (req, res, next) => {
      try {
    const gender = req.query.gender || "all";

    let query = {
      category: "watch", // 👟 All watches
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
      const allWatchesProducts = await Product.find(query).sort({ createdAt: -1 });

      return res.render("User/allWatches", {
        products: allWatchesProducts,
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
    const allWatchesProducts = await Product.find(query).sort({ createdAt: -1 });

    res.render("User/allWatches", {
      products: allWatchesProducts,
      selectedGender: gender,
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error("❌ Get All Watches Products Error:", error);
    next(error);
  }
}

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

// GET PROFILE
exports.getProfile = async (req, res, next) => {
  try {
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);

    if (!user || user.role !== "user") {
      return req.session.destroy(() => res.redirect("/login"));
    }

    res.render("User/profile", {
      user,
      isLoggedIn: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// UPDATE PROFILE (with optional photo)
exports.updateUserData = async (req, res, next) => {
  try {
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const userId = req.session.user._id;

    const {
      username,
      phoneNo,
      emailAddress,
      dob,
      street,
      city,
      state,
      country,
      pincode,
    } = req.body;

    let profilePhotoUrl;

    // If user uploaded a new profile photo
    if (req.file) {
      profilePhotoUrl = await uploadToPhpServer(req.file.path);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        phoneNo,
        emailAddress,
        dob: dob ? new Date(dob) : undefined,
        street,
        city,
        state,
        country,
        pincode,
        ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }), // only update if uploaded
      },
      { new: true, runValidators: true }
    );

    // Update session
    req.session.user = {
      _id: updatedUser._id.toString(),
      username: updatedUser.username,
      role: updatedUser.role,
      profilePhoto: updatedUser.profilePhoto,
    };


    res.redirect("/profile");
  } catch (err) {
    console.error("❌ Update User Error:", err);
    res.status(500).send("Update failed, try again.");
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





exports.getOrderSuccess = async (req, res) => {
  try {
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // For order success
    const order = await Order.findById(req.params.id)
      // .populate("product")             // Buy now product
      .populate("items.product");      // Cart products


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


exports.getOrderHistory = async (req, res, next) => {
  try {
    // ✅ Check login
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);
    if (!user || user.role !== "user") {
      return req.session.destroy(() => res.redirect("/login"));
    }

    // ✅ Populate only items.product
    const orders = await Order.find({ user: user._id })
      .populate("items.product") 
      .sort({ createdAt: -1 });

    // 🧠 Normalize data for EJS
    const finalOrders = orders.map(order => {
      const products = order.items.map(item => ({
        product: item.product,
        qty: item.qty,
        size: item.size,
        price: item.price,
        total: item.total
      }));

      return {
        ...order.toObject(),
        products
      };
    });

    res.render("User/orderHistory", {
      orders: finalOrders,
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn
    });

  } catch (err) {
    console.error(err);
    next(err);
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
        size: item.size,   // ✅ SEND USER SELECTED SIZE
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
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.status(401).json({ success: false });
    }

    const { productId, size, quantity } = req.body;

    if (!productId || !quantity) {
      return res.json({ success: false, message: "Invalid data" });
    }

    const product = await Product.findById(productId);
    if (!product || product.status !== "active") {
      return res.json({ success: false, message: "Product not available" });
    }

    const user = await User.findById(req.session.user._id);

    // 🔁 Same product + same size already exists
    const item = user.cart.find(
      i => i.product.toString() === productId && i.size === size
    );
    const existing = item;

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      user.cart.push({
        product: productId,
        quantity,
        size: size || null   // 👈 SAVE SIZE
      });

    }

    await user.save();

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};



// UPDATE QTY
exports.updateCartQty = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const user = await User.findById(req.session.user._id);

    const item = user.cart.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.json({ success: false });

    if (action === "inc") item.quantity += 1;
    if (action === "dec" && item.quantity > 1) item.quantity -= 1;

    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.session.user._id);

    user.cart = user.cart.filter(
      (i) => i.product.toString() !== productId
    );

    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.postBuyNowOrder = async (req,res)=>{
 try{
  let { productId, qty, name, mobile, address, pincode, state, paymentMethod, size } = req.body;
  const userId = req.session.user._id;

  qty = Number(qty);
  if(!qty || qty < 1) return res.send("Invalid quantity");

  const product = await Product.findById(productId);
  if(!product || product.status!=="active") return res.send("Product not available");

  // Stock only for non-size products
  if(product.category!=="shoes" && product.category!=="clothes"){
    if(product.totalStock < qty) return res.send("Out of stock");
  }

  // Size required only for size products
  if((product.category==="shoes" || product.category==="clothes") && !size){
    return res.send("Please select size");
  }

  const price = product.offerPrice>0 ? product.offerPrice : product.price;
  const totalAmount = price * qty;

  // ONLINE
  if(paymentMethod==="ONLINE"){
    req.session.tempOrder = {
      user:userId,
      items:[{
        product:productId,
        qty,
        size: (product.category==="shoes"||product.category==="clothes") ? size : null,
        price,
        total: totalAmount
      }],
      totalAmount,
      name,mobile,address,pincode,state
    };
    return res.send("Online payment pending");
  }

  // COD stock reduce
  if(product.category!=="shoes" && product.category!=="clothes"){
    const r = await Product.updateOne({_id:productId,totalStock:{$gte:qty}},{$inc:{totalStock:-qty}});
    if(r.modifiedCount===0) return res.send("Out of stock");
  }

  const order = await Order.create({
    user:userId,
    items:[{
      product:productId,
      qty,
      size:(product.category==="shoes"||product.category==="clothes")?size:null,
      price,
      total: totalAmount
    }],
    totalAmount,
    name,mobile,address,pincode,state,
    paymentMethod:"COD",
    paymentStatus:"Pending",
    orderStatus:"Confirmed"
  });

  res.redirect("/order-success/"+order._id);

 }catch(err){
  console.error(err);
  res.send("Order Failed");
 }
};

exports.postCartCheckout = async (req,res)=>{
 try{
  if(!req.session.isLoggedIn) return res.redirect("/login");

  const {name,mobile,address,pincode,state,paymentMethod} = req.body;
  const user = await User.findById(req.session.user._id).populate("cart.product");

  if(!user || user.cart.length===0) return res.redirect("/cart");

  let items=[];
  let totalAmount=0;

  for(let c of user.cart){
    const p = c.product;

    if(!p || p.status!=="active") return res.send(p.title+" not available");

    if(p.category!=="shoes" && p.category!=="clothes"){
      if(p.totalStock < c.quantity) return res.send(p.title+" out of stock");
    }

    const price = p.offerPrice>0?p.offerPrice:p.price;
    const total = price * c.quantity;
    totalAmount += total;

    items.push({
      product:p._id,
      qty:Number(c.quantity),
      size:c.size||null,
      price,
      total
    });
  }

  // ONLINE
  if(paymentMethod==="ONLINE"){
    req.session.tempCartOrder={user:user._id,items,totalAmount,name,mobile,address,pincode,state};
    return res.send("Online payment pending");
  }

  // COD reduce stock
  for(let c of user.cart){
    const p = c.product;
    if(p.category!=="shoes" && p.category!=="clothes"){
      await Product.updateOne({_id:p._id},{$inc:{totalStock:-c.quantity}});
    }
  }

  const order = await Order.create({
    user:user._id,
    items,
    totalAmount,
    name,mobile,address,pincode,state,
    paymentMethod:"COD",
    paymentStatus:"Pending",
    orderStatus:"Confirmed"
  });

  user.cart=[];
  await user.save();

  res.redirect("/order-success/"+order._id);

 }catch(err){
  console.error(err);
  res.send("Cart Order Failed");
 }
};
