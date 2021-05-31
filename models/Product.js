const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    isComplete: { type: Boolean },
    isActive: { type: Boolean },
    friendlyName: { type: String, index: true },
    subscription: {
      _id: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },

    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
      required: true,
    },

    columns: { type: Array, columnName: String, value: String },
  },
  { timestamps: true }
);

ProductSchema.index({ friendlyName: 1 });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
