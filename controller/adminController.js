// exports.getAdminHowManyShoesUploaded = async (req, res, next) => {
//   try {
//     // 🔐 admin check
//     if (!req.session.isLoggedIn || !req.session.user) {
//       return req.session.destroy(() => res.redirect("/login"));
//     }

//     const admin = req.session.user;

//     // 🔍 filter from query
//     const filter = req.query.filter || "all";

//     let findQuery = { category: "shoes" };

//     if (filter === "show") {
//       findQuery.status = "active";
//     }

//     if (filter === "hide") {
//       findQuery.status = "inactive";
//     }

//     const products = await Product.find(findQuery).sort({ createdAt: -1 });

//     res.render("Admin/adminAllShoesProducts", {
//       admin,
//       products,
//       selectedFilter: filter, // 👈 for select box
//       isLoggedIn: req.session.isLoggedIn,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };


// exports.postAdminHowManyShoesProductUploaded = async (req, res, next) => {
//   try {
//     // 🔐 Session + Role Check
//     if (!req.session.isLoggedIn || !req.session.user) {
//       return req.session.destroy(() => res.redirect("/login"));
//     }
//     const admin = req.session.user;
//     if (admin.role !== "admin") {
//       return res.status(403).redirect("/login");
//     }
//     const {
//       title,
//       price,
//       offerPercentage,
//       totalStock,
//       gender,
//       brand,
//       sizes,
//       category,
//     } = req.body; // ✅ SAFE OFFER VALUE
//     const offer = Number(offerPercentage) || 0;
//     // 🖼 Image validation
//     if (!req.files || req.files.length < 1) {
//       return res.status(400).send("Minimum 1 images required");
//     }
//     // ☁ Upload to Cloudinary
//     let imageUrls = [];
//     for (let file of req.files) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: "shoes",
//       });
//       imageUrls.push(result.secure_url);
//     }
//     // 📦 Sizes (checkbox fix)
//     let sizeArray = [];
//     if (Array.isArray(sizes)) {
//       sizeArray = sizes.map(Number);
//     } else if (sizes) {
//       sizeArray = [Number(sizes)];
//     }
//     // 🧠 Create Product
//     const product = new Product({
//       title,
//       price,
//       offerPercentage: offer, // 👈 yahan
//       totalStock,
//       gender,
//       brand,
//       category,
//       sizes: sizeArray,
//       images: imageUrls,
//       createdBy: admin._id,
//     });
//     await product.save();
//     console.log("✅ Shoe added successfully");
//     res.redirect("/admin-howmanyshoesuploaded"); // change as needed
//   } catch (err) {
//     console.error("❌ Add Shoe Error:", err);
//     res.status(500).send("Something went wrong");
//   }
// };

// exports.postAdminShoesEditProducts = async (req, res, next) => {
//   try {
//     // 🔐 LOGIN + ROLE CHECK
//     if (!req.session.isLoggedIn || !req.session.user) {
//       return req.session.destroy(() => res.redirect("/login"));
//     }

//     if (req.session.user.role !== "admin") {
//       return res.status(403).redirect("/login");
//     }

//     const {
//       productId,
//       title,
//       price,
//       offerPercentage,
//       totalStock,
//       gender,
//       brand,
//       status,
//       sizes,
//     } = req.body;

//     // 🧠 PRODUCT FIND
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).send("Product not found");
//     }

//     // 👟 SIZES FIX
//     let sizeArray = [];
//     if (Array.isArray(sizes)) {
//       sizeArray = sizes.map(Number);
//     } else if (sizes) {
//       sizeArray = [Number(sizes)];
//     }

//     // ✏ UPDATE BASIC FIELDS
//     product.title = title;
//     product.price = price;
//     product.offerPercentage = offerPercentage || 0;
//     product.totalStock = totalStock;
//     product.gender = gender;
//     product.brand = brand;
//     product.status = status;
//     product.sizes = sizeArray;

//     // 🖼 IMAGE UPDATE (OPTIONAL)
//     if (req.files && req.files.length > 0) {
//       let imageUrls = [];

//       for (let file of req.files) {
//         const result = await cloudinary.uploader.upload(file.path, {
//           folder: "shoes",
//         });
//         imageUrls.push(result.secure_url);
//       }

//       product.images = imageUrls; // 🔥 replace old images
//     }
//     // else → keep old images automatically

//     await product.save(); // offerPrice auto recalculated

//     console.log("✅ Shoes updated:", product.title);

//     return res.redirect("/admin-howmanyshoesuploaded");
//   } catch (err) {
//     console.error("❌ Edit Shoe Error:", err);
//     res.status(500).send("Update failed");
//   }
// };


const User = require("../model/userSchema");
const Product = require("../model/productSchema");
// const cloudinary = require("../utils/cloudinary");
const uploadToPhpServer = require("../utils/uploadToPhpServer");
exports.getAdminHome = async (req, res, next) => {
  try {
    // 1️⃣ Login check
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // 2️⃣ Role check (ONLY ADMIN)
    if (req.session.user.role !== "admin") {
      return res.redirect("/login");
    }

    // 3️⃣ Fetch ALL users with role = "user"
    const users = await User.find({ role: "user" }).sort({
      createdAt: -1,
    });

    // 4️⃣ Render admin page OR send data
    res.render("Admin/adminHome", {
      isLoggedIn: req.session.isLoggedIn,
      admin: req.session.user,
      users: users,
    });

    // 🔁 OR (agar API banana hai)
    // res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getAdminUsersList = async (req, res, next) => {
  try {
    // 1️⃣ Login check
    if (!req.session.isLoggedIn || !req.session.user) {
      return res.redirect("/login");
    }

    // 2️⃣ Role check (ONLY ADMIN)
    if (req.session.user.role !== "admin") {
      return res.redirect("/login");
    }

    // 3️⃣ Fetch ALL users with role = "user"
    const users = await User.find({ role: "user" }).sort({
      createdAt: -1,
    });

    // 4️⃣ Render admin page OR send data
    res.render("Admin/userList", {
      isLoggedIn: req.session.isLoggedIn,
      admin: req.session.user,
      users: users,
    });

    // 🔁 OR (agar API banana hai)
    // res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};



exports.getAdminHowManyShoesUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;

    // 🔒 ROLE CHECK (important)
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    // 🔍 FILTER FROM QUERY
    const filter = req.query.filter || "all";

    let findQuery = { category: "shoes" };

    if (filter === "show") {
      findQuery.status = "active";
    } else if (filter === "hide") {
      findQuery.status = "inactive";
    }

    // 📦 FETCH PRODUCTS
    const products = await Product.find(findQuery).sort({ createdAt: -1 });

    // 🖥 RENDER
    res.render("Admin/adminAllShoesProducts", {
      admin,
      products,
      selectedFilter: filter,
      isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("❌ Get Shoes Error:", err);
    res.status(500).send("Server Error");
  }
};


exports.postAdminHowManyShoesProductUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      sizes,
      category,
    } = req.body;

    const offer = Number(offerPercentage) || 0;

    // 🖼 IMAGE VALIDATION
    if (!req.files || req.files.length < 1) {
      return res.status(400).send("Minimum 1 image required");
    }

    // 🚀 UPLOAD TO PHP SERVER
    let imageUrls = [];

     for (let file of req.files) {
      const url = await uploadToPhpServer(file.path);
      imageUrls.push(url);
    }

    // 📦 SIZES FIX
    let sizeArray = [];
    if (Array.isArray(sizes)) {
      sizeArray = sizes.map(String);
    } else if (sizes) {
      sizeArray = [String(sizes)];
    }

    // 🧠 CREATE PRODUCT
    const product = new Product({
      title,
      price,
      offerPercentage: offer,
      totalStock,
      gender,
      brand,
      category,
      sizes: sizeArray,
      images: imageUrls,
      createdBy: admin._id,
    });

    await product.save();

    console.log("✅ Shoe added (PHP Upload)");
    res.redirect("/admin-howmanyshoesuploaded");

  } catch (err) {
    console.error("❌ Add Shoe Error:", err);
    res.status(500).send("Something went wrong");
  }
};


exports.postAdminShoesEditProducts = async (req, res, next) => {
  try {
    // 🔐 LOGIN + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    if (req.session.user.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      productId,
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      status,
      sizes,
    } = req.body;

    // 🧠 FIND PRODUCT
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // 👟 SIZES FIX
    let sizeArray = [];
    if (Array.isArray(sizes)) {
      sizeArray = sizes.map(String);
    } else if (sizes) {
      sizeArray = [String(sizes)];
    }

    // ✏ UPDATE BASIC FIELDS
    product.title = title;
    product.price = price;
    product.offerPercentage = offerPercentage || 0;
    product.totalStock = totalStock;
    product.gender = gender;
    product.brand = brand;
    product.status = status;
    product.sizes = sizeArray;

    // 🖼 IMAGE UPDATE (OPTIONAL PHP UPLOAD)
    if (req.files && req.files.length > 0) {
      let imageUrls = [];

      for (let file of req.files) {
        const url = await uploadToPhpServer(file.path);
        imageUrls.push(url);
      }

      product.images = imageUrls; // 🔥 replace old images
    }
    // else → keep old images automatically

    await product.save(); // offerPrice auto recalculated

    console.log("✅ Shoes updated (PHP Upload):", product.title);

    return res.redirect("/admin-howmanyshoesuploaded");
  } catch (err) {
    console.error("❌ Edit Shoe Error:", err);
    res.status(500).send("Update failed");
  }
};



exports.getAdminHowManyGlassesUploaded = async (req, res, next) => {
  try {
    // 🔐 ADMIN SESSION CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;

    // 🔍 FILTER FROM QUERY
    const filter = req.query.filter || "all";

    let findQuery = { category: "glasses" };

    if (filter === "show") {
      findQuery.status = "active";
    }

    if (filter === "hide") {
      findQuery.status = "inactive";
    }

    const products = await Product.find(findQuery).sort({ createdAt: -1 });

    res.render("Admin/adminAllGlassesProducts", {
      admin,
      products,
      selectedFilter: filter, // 👈 for select box
      isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("❌ Glasses GET Error:", err);
    res.status(500).send("Server Error");
  }
};


exports.postAdminHowManyGlassesProductUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      category,
    } = req.body;

    // ✅ SAFE OFFER VALUE
    const offer = Number(offerPercentage) || 0;

    // 🖼 IMAGE VALIDATION
    if (!req.files || req.files.length < 1) {
      return res.status(400).send("Minimum 1 image required");
    }

    // ☁ CLOUDINARY UPLOAD
     let imageUrls = [];

     for (let file of req.files) {
      const url = await uploadToPhpServer(file.path);
      imageUrls.push(url);
    }

    // 🧠 CREATE PRODUCT
    const product = new Product({
      title,
      price,
      offerPercentage: offer,
      totalStock,
      gender,
      category, // "glasses"
      images: imageUrls,
      createdBy: admin._id,
    });

    await product.save();

    console.log("✅ Glasses added successfully");
    res.redirect("/admin-howmanyglassesuploaded");

  } catch (err) {
    console.error("❌ Add Glasses Error:", err);
    res.status(500).send("Something went wrong");
  }
};

exports.postAdminGlassesEditProducts = async (req, res, next) => {
  try {
    // 🔐 LOGIN + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    if (req.session.user.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      productId,
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      status,
    } = req.body;

    // 🧠 FIND PRODUCT
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // ✏ UPDATE BASIC FIELDS
    product.title = title;
    product.price = price;
    product.offerPercentage = offerPercentage || 0;
    product.totalStock = totalStock;
    product.gender = gender;
    product.status = status;

    // 🖼 IMAGE UPDATE (OPTIONAL PHP UPLOAD)
    if (req.files && req.files.length > 0) {
      let imageUrls = [];

      for (let file of req.files) {
        const url = await uploadToPhpServer(file.path);
        imageUrls.push(url);
      }

      product.images = imageUrls; // 🔥 replace old images
    }
    // else → keep old images

    await product.save();

    console.log("✅ Glasses updated:", product.title);

    return res.redirect("/admin-howmanyglassesuploaded");
  } catch (err) {
    console.error("❌ Edit Glasses Error:", err);
    res.status(500).send("Update failed");
  }
};


exports.getAdminHowManyWatchesUploaded = async (req, res, next) => {
  try {
    // 🔐 ADMIN SESSION CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;

    // 🔍 FILTER FROM QUERY (?filter=show | hide | all)
    const filter = req.query.filter || "all";

    let findQuery = { category: "watch" };

    if (filter === "show") {
      findQuery.status = "active";
    }

    if (filter === "hide") {
      findQuery.status = "inactive";
    }

    const products = await Product.find(findQuery).sort({ createdAt: -1 });

    res.render("Admin/adminAllWatchesProducts", {
      admin,
      products,
      selectedFilter: filter, // 👈 select box ke liye
      isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("❌ Watches GET Error:", err);
    res.status(500).send("Server Error");
  }
};


exports.postAdminHowManyWatchesUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      category, // "watch"
    } = req.body;

    const offer = Number(offerPercentage) || 0;

    // 🖼 IMAGE VALIDATION
    if (!req.files || req.files.length < 1) {
      return res.status(400).send("Minimum 1 image required");
    }

    // 🚀 UPLOAD TO PHP SERVER
    let imageUrls = [];
    for (let file of req.files) {
      const url = await uploadToPhpServer(file.path);
      imageUrls.push(url);
    }

    // 🧠 CREATE PRODUCT
    const product = new Product({
      title,
      price,
      offerPercentage: offer,
      totalStock,
      gender,
      brand: brand || null,
      category, // "watch"
      images: imageUrls,
      createdBy: admin._id,
    });

    await product.save();

    console.log("✅ Watch added successfully");
    res.redirect("/admin-howmanywatchesuploaded");

  } catch (err) {
    console.error("❌ Add Watch Error:", err);
    res.status(500).send("Something went wrong");
  }
};

exports.postAdminWatchesEditProducts = async (req, res, next) => {
  try {
    // 🔐 LOGIN + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    if (req.session.user.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      productId,
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      status,
    } = req.body;

    // 🧠 FIND PRODUCT
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // ✏ UPDATE BASIC FIELDS
    product.title = title;
    product.price = price;
    product.offerPercentage = offerPercentage || 0;
    product.totalStock = totalStock;
    product.gender = gender;
    product.brand = brand || null;
    product.status = status;

    // 🖼 IMAGE UPDATE (OPTIONAL – PHP UPLOAD)
    if (req.files && req.files.length > 0) {
      let imageUrls = [];

      for (let file of req.files) {
        const url = await uploadToPhpServer(file.path);
        imageUrls.push(url);
      }

      product.images = imageUrls; // 🔥 replace old images
    }
    // else → old images remain unchanged

    await product.save(); // offerPrice auto recalculated

    console.log("✅ Watch updated:", product.title);

    return res.redirect("/admin-howmanywatchesuploaded");
  } catch (err) {
    console.error("❌ Edit Watch Error:", err);
    res.status(500).send("Update failed");
  }
};

exports.getAdminHowManyClothesUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + LOGIN CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;

    // 🔒 ROLE CHECK (important)
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    // 🔍 FILTER FROM QUERY
    const filter = req.query.filter || "all";

    let findQuery = { category: "clothes" };

    if (filter === "show") {
      findQuery.status = "active";
    } else if (filter === "hide") {
      findQuery.status = "inactive";
    }

    // 📦 FETCH PRODUCTS
    const products = await Product.find(findQuery).sort({ createdAt: -1 });

    // 🖥 RENDER
    res.render("Admin/adminAllClothesProducts", {
      admin,
      products,
      selectedFilter: filter,
      isLoggedIn: req.session.isLoggedIn,
    });

  } catch (err) {
    console.error("❌ Get Shoes Error:", err);
    res.status(500).send("Server Error");
  }
};

exports.postAdminHowManyClothesUploaded = async (req, res, next) => {
  try {
    // 🔐 SESSION + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    const admin = req.session.user;
    if (admin.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      sizes,
      category,
    } = req.body;

    const offer = Number(offerPercentage) || 0;

    // 🖼 IMAGE VALIDATION
    if (!req.files || req.files.length < 1) {
      return res.status(400).send("Minimum 1 image required");
    }

    // 🚀 UPLOAD TO PHP SERVER
    let imageUrls = [];

     for (let file of req.files) {
      const url = await uploadToPhpServer(file.path);
      imageUrls.push(url);
    }

    // 📦 SIZES FIX
    let sizeArray = [];
    if (Array.isArray(sizes)) {
      sizeArray = sizes.map(String);
    } else if (sizes) {
      sizeArray = [String (sizes)];
    }

    // 🧠 CREATE PRODUCT
    const product = new Product({
      title,
      price,
      offerPercentage: offer,
      totalStock,
      gender,
      brand,
      category,
      sizes: sizeArray,
      images: imageUrls,
      createdBy: admin._id,
    });

    await product.save();

    console.log("✅ Clothes added (PHP Upload)");
    res.redirect("/admin-howmanyclothesuploaded");

  } catch (err) {
    console.error("❌ Add Clothes Error:", err);
    res.status(500).send("Something went wrong");
  }
};

exports.postAdminClothesEditProducts = async (req, res, next) => {
  try {
    // 🔐 LOGIN + ROLE CHECK
    if (!req.session.isLoggedIn || !req.session.user) {
      return req.session.destroy(() => res.redirect("/login"));
    }

    if (req.session.user.role !== "admin") {
      return res.status(403).redirect("/login");
    }

    const {
      productId,
      title,
      price,
      offerPercentage,
      totalStock,
      gender,
      brand,
      status,
      sizes,
    } = req.body;

    // 🧠 FIND PRODUCT
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // 👟 SIZES FIX
    let sizeArray = [];
    if (Array.isArray(sizes)) {
      sizeArray = sizes.map(String);
    } else if (sizes) {
      sizeArray = [String(sizes)];
    }

    // ✏ UPDATE BASIC FIELDS
    product.title = title;
    product.price = price;
    product.offerPercentage = offerPercentage || 0;
    product.totalStock = totalStock;
    product.gender = gender;
    product.brand = brand;
    product.status = status;
    product.sizes = sizeArray;

    // 🖼 IMAGE UPDATE (OPTIONAL PHP UPLOAD)
    if (req.files && req.files.length > 0) {
      let imageUrls = [];

      for (let file of req.files) {
        const url = await uploadToPhpServer(file.path);
        imageUrls.push(url);
      }

      product.images = imageUrls; // 🔥 replace old images
    }
    // else → keep old images automatically

    await product.save(); // offerPrice auto recalculated

    console.log("✅ Clothes updated (PHP Upload):", product.title);

    return res.redirect("/admin-howmanyclothesuploaded");
  } catch (err) {
    console.error("❌ Edit Clothes Error:", err);
    res.status(500).send("Update failed");
  }
};

