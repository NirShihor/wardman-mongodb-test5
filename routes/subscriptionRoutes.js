const express = require('express');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

const app = express();

// Add A New Product
const createSubscription = app.post(
  '/addsubscription',
  (req, res, handleError) => {
    subscription = new Subscription({
      _id: new mongoose.Types.ObjectId(),
      client: req.body.clientId,
      subscriptionType: req.body.subscriptionTypeId,
      IsBundled: req.body.IsBundled,
      bundle: req.body.bundleId,
      externalID: req.body.externalId,
      IsActive: req.body.isActive,
      startDate: req.body.startDate,
      users: req.body.userId,
      devices: req.body.deviceId,
    });
    subscription.save((err) => {
      if (err) {
        return handleError(err);
      } else {
        res.send('Subscription has been added');
      }
    });
  }
);

module.exports = createSubscription;
