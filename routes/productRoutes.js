const express = require('express');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ProductType = require('../models/ProductType');
const { db } = require('../models/Product');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

// Create product based on productType
var asyncFucntion = async (req) => {
  var subscription = req.body.subscription;
  var isComplete = req.body.isComplete;
  var isActive = req.body.isActive;
  var friendlyName = req.body.friendlyName;
  var productType = req.body.productType;
  var productTypeId = req.body.productType;

  var getColumnName = async (err) => {
    var product = await ProductType.findOne({
      _id: productType,
    });
    if (err) {
      console.log('Something is wrong');
    }
    return product;
  };

  var columnName = await getColumnName();
  columnName = columnName.columnNames[0];

  value = 'some other value';

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productType,
    productTypeId,
    columns: [{ columnName, value }],
    subscription,
    isComplete,
    isActive,
    friendlyName,
  });
  product.save();
};

router.get('/getcolumnname', async (req, res) => {
  try {
    asyncFucntion(req);
  } catch (error) {
    console.error(error);
  } finally {
    res.send('Product was added');
  }
});
// __________________________________________________

//Display all products
router.get('/getproducts', (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(err);
      res.send('Something went wrong...');
    }
  });
});
// __________________________________________________

//Display one product
router.get('/getproductbyid', async (req, res) => {
  Product.findOne({ _id: req.body.productId })
    .populate('productTypes')
    .exec((err, product) => {
      if (err) return handleError(err);
      res.send(product);
    });
});
// __________________________________________________

// To check which fields are indexed
// Product.collection
//   .getIndexes({ full: true })
//   .then((indexes) => {
//     console.log('indexes:', indexes);
//   })
//   .catch(console.error);

// To check if indexing works
// (async () => {
//   const result = await Product.find(
//     { friendlyName: 'Nice other Name' },
//     '_id'
//   ).explain('executionStats');
//   console.log(result);
// })();

module.exports = router;
