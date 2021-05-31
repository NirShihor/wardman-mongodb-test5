const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // client: mongoose.Schema.Types.ObjectId,
    // temp
    client: String,
    // temp
    subscriptionType: mongoose.Schema.Types.ObjectId,
    IsBundled: Boolean,
    // temp
    // bundle: mongoose.Schema.Types.ObjectId,
    bundle: String,
    externalID: String,
    IsActive: Boolean,
    startDate: Date,
    users: [
      {
        _id: false,
        productTypeId: mongoose.Schema.Types.ObjectId,
      },
    ],
    devices: [
      {
        _id: false,
        productTypeId: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
