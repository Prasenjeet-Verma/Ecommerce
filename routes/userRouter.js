const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');


userRouter.get('/', userController.getHome);
userRouter.get('/luxuryBoysWatches', userController.getLuxuryBoysWatches);
userRouter.get('/luxuryGirlsWatches', userController.getLuxuryGirlsWatches);
userRouter.get('/allgoogles', userController.getAllGoogles);
userRouter.get('/luxuryladishsbags', userController.getAllLuxuryLadiesBags);
userRouter.get('/adidas', userController.getAdidasProducts);
userRouter.post("/wishlist/toggle", userController.posttoggleWishlist);
userRouter.get('/wishlist', userController.getWishlist);
userRouter.get('/add-to-cart', userController.getAddToCart);
userRouter.post('/add-to-cart', userController.postAddToCart);
userRouter.get('/product/:id', userController.getViewProduct);
userRouter.get("/order-success/:id", userController.getOrderSuccess);
userRouter.post('/buy-now', userController.postBuyNowOrder);
module.exports = userRouter;