const mongoose = require("mongoose");

// Each product inside cart order
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  size: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔹 For BUY NOW orders
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    qty: Number,
    size: String,
    price: Number,

    // 🔹 For CART orders
    items: [orderItemSchema],

    totalAmount: {
      type: Number,
      required: true
    },

    // 🧍 Customer
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: ["Pending","Confirmed","Shipped","Out for Delivery","Delivered","Cancelled"],
      default: "Confirmed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
