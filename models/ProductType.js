const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // module: { type: mongoose.Schema.Types.ObjectId, ref: 'modules' },
    // TEMPORARY until creating modules:
    module: {},
    productName: { type: String },
    internalComments: { type: String },
    columnNames: [{}],
    staticDetails: [{ detailName: String, content: String }],
  },

  { timestamps: true }
);

const ProductType = mongoose.model('ProductType', ProductTypeSchema);

module.exports = ProductType;
