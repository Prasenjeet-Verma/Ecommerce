const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    phoneNo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    emailAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    userStatus: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },

    // 🆕 TOTAL SPEND
    totalSpend: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 🆕 TOTAL ORDERS
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ❤️ WISHLIST (✅ yahin hona chahiye)
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
      }
    ],


    dob: { type: Date },
    street: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    country: { type: String },
    profilePhoto: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Rider+Shoe&background=c084fc&color=fff"
    },



  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
