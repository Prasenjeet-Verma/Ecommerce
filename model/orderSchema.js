const mongoose = require("mongoose");

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
    type: String,
    default: null
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

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 🔥 only one system now → items[] for both buy now & cart
  items: [orderItemSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  name: String,
  mobile: String,
  address: String,
  pincode: String,
  state: String,

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
    enum: ["Pending","Confirmed","Shipped","Delivered","Cancelled"],
    default: "Confirmed"
  }
},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
