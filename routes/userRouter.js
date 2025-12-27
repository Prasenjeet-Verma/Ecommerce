const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');


userRouter.get('/', userController.getHome);
userRouter.get('/luxuryBoysWatches', userController.getLuxuryBoysWatches);
userRouter.get('/luxuryGirlsWatches', userController.getLuxuryGirlsWatches);
userRouter.get('/allgoogles', userController.getAllGoogles);
userRouter.post("/wishlist/toggle", userController.toggleWishlist);
userRouter.get('/wishlist', userController.getWishlist);
module.exports = userRouter;