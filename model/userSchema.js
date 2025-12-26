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

    // 🆕 TOTAL SPEND (lifetime)
    totalSpend: {
      type: Number,
      default: 0,
      min: 0,
    },

    // 🆕 Total orders placed by user (lifetime)
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
