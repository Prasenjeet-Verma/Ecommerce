// adminRouter.post(
//   "/admin-howmanyglassesuploaded",
//   upload.array("images", 4), // 👈 name="images"
//   adminController.postAdminHowManyGlassesProductUploaded
// );
// adminRouter.post(
//   "/admin-editglassesproducts",
//   upload.array("images", 4), // 👈 same multer
//   adminController.postAdminGlassesEditProducts
// );

const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');


// userRouter.get('/', userController.home);
adminRouter.get('/admin-home', adminController.getAdminHome);
adminRouter.get('/admin-userlist', adminController.getAdminUsersList);
// adminRouter.get('/admin-seeuseralldetails', adminController.getAdminAllUserDetails); <-- ismai user details ke sath sath users orders details bhi add krna hai isliye ismai abhi code nhi likha gaya hai.
adminRouter.get('/admin-howmanyshoesuploaded', adminController.getAdminHowManyShoesUploaded);

const upload = require("../utils/multer");

adminRouter.post(
  "/admin-howmanyshoesuploaded",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminHowManyShoesProductUploaded
);


adminRouter.post(
  "/admin-editshoesproducts",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminShoesEditProducts
);

adminRouter.get('/admin-howmanyglassesuploaded', adminController.getAdminHowManyGlassesUploaded);
adminRouter.post(
  "/admin-howmanyglassesuploaded",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminHowManyGlassesProductUploaded
);


adminRouter.post(
  "/admin-editglassesproducts",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminGlassesEditProducts
);


adminRouter.get('/admin-howmanywatchesuploaded', adminController.getAdminHowManyWatchesUploaded);
adminRouter.post(
  "/admin-howmanywatchesuploaded",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminHowManyWatchesUploaded
);

adminRouter.post(
  "/admin-editwatchesproducts",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminWatchesEditProducts
);


adminRouter.get('/admin-howmanyclothesuploaded', adminController.getAdminHowManyClothesUploaded);
adminRouter.post(
  "/admin-howmanyclothesuploaded",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminHowManyClothesUploaded
);

adminRouter.post(
  "/admin-editclothesproducts",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminClothesEditProducts
);

adminRouter.get('/admin-howmanybagsuploaded', adminController.getAdminHowManyBagsUploaded);
adminRouter.post(
  "/admin-howmanybagsuploaded",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminHowManyBagsUploaded
);

adminRouter.post(
  "/admin-editbagsproducts",
  (req, res, next) => {
    upload.array("images", 4)(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send("Each image must be under 2MB");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).send("Maximum 4 images allowed");
        }
        return res.status(400).send(err.message);
      }
      next();
    });
  },
  adminController.postAdminBagsEditProducts
);



module.exports = adminRouter;
 
