const mongoose = require('mongoose');

const SubscriptionTypeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    subscriptionName: String,
    price: mongoose.Types.Decimal128,
    minimumTerm: Number,
    description: String,
    internalComments: String,
    maxUsers: Number,
    maxDevices: Number,
    productTypes: [
      {
        _id: false,
        productTypeId: mongoose.Schema.Types.ObjectId,
      },
    ],
  },

  { timestamps: true }
);

const SubscriptionType = mongoose.model(
  'SubscriptionType',
  SubscriptionTypeSchema
);

module.exports = SubscriptionType;
