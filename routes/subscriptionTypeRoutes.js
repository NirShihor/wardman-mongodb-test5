const express = require('express');
const SubscriptionType = require('../models/SubscriptionType');
const mongoose = require('mongoose');

const app = express();

// Add A New Product
const createSubscriptionType = app.post(
  '/addsubscriptiontype',
  (req, res, handleError) => {
    subscriptionType = new SubscriptionType({
      _id: new mongoose.Types.ObjectId(),
      subscriptionName: req.body.subscriptionName,
      price: req.body.price,
      minimumTerm: req.body.miminumTerm,
      description: req.body.description,
      internalComments: req.body.internalComments,
      maxUsers: req.body.maximumUsers,
      maxDevices: req.body.maximumDevices,
      productTypes: req.body.productType,
    });
    subscriptionType.save((err) => {
      if (err) {
        return handleError(err);
      } else {
        res.send('Subscription Type has been added');
      }
    });
  }
);

module.exports = createSubscriptionType;
