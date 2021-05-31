const mongoose = require('mongoose');

// DB Config
const db = require('./keys').MongoURI;

// Connect to Mongo db

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // disabling automatic indexing for production
    autoIndex: false,
  })
  .then(() => {
    console.log('Mongo DB Connected');
  })
  .catch((err) => {
    console.log(err);
  });
