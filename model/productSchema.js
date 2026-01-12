const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, trim: true },

    category: {
      type: String,
      enum: ["shoes", "watch", "clothes", "glasses", "bags", "crocs", "sliders"],
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },

    // ❌ NOT required globally
    brand: {
      type: String,
      default: null,
    },

    price: { type: Number, required: true },

    offerPercentage: { type: Number, default: 0 },

    offerPrice: { type: Number },

    totalStock: { type: Number, required: true },

    // ❌ Only for shoes
    sizes: {
      type: [String],   // 🔥 FIX
      default: [],
    },

    images: {
      type: [String],
      validate: (v) => v.length > 0,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// 🔥 Auto calculate offer price
productSchema.pre("save", async function () {
  if (this.offerPercentage > 0) {
    this.offerPrice = this.price - (this.price * this.offerPercentage) / 100;
  } else {
    this.offerPrice = this.price;
  }
});

module.exports = mongoose.model("Product", productSchema);
