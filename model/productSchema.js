const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, trim: true },

    category: {
      type: String,
      enum: ["shoes", "watch", "clothes", "accessories", "glasses"],
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


    // sizes: {
    //   type: [Number],
    //   default: [],
    //   validate: {
    //     validator: function (v) {
    //       return this.category !== "shoes" || v.length > 0;
    //     },
    //     message: "Sizes required for shoes",
    //   },
    // },

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
