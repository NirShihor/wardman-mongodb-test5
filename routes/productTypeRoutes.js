const express = require('express');
const ProductType = require('../models/ProductType');
const mongoose = require('mongoose');

const app = express();

// Add A New Product
const createProductType = app.post(
  '/addproducttype',
  (req, res, handleError) => {
    productType = new ProductType({
      _id: new mongoose.Types.ObjectId(),
      module: req.body.module,
      productName: req.body.productName,
      internalComments: req.body.internalComments,
      columnNames: req.body.columnName,
      staticDetails: req.body.staticDetails,
    });
    productType.save((err) => {
      if (err) {
        return handleError(err);
      } else {
        res.send('Product Type has been added');
      }
    });
  }
);

module.exports = createProductType;
