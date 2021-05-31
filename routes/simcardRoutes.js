const express = require('express');
const Simcard = require('../models/Simcard');
const Client = require('../models/Client');

bodyParser = require('body-parser').json();

const app = express();

// Add A New Simcard
const createSimcard = app.post('/addsimcard', bodyParser, (req, res) => {
  const NewSimcard = new Simcard({
    name: req.body.name,
    assignedTo: req.body.assignedTo,
    externalComments: req.body.externalComments,
    internalComments: req.body.internalComments,
  });
  NewSimcard.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Simcard has been added');
      res.send('Simcard has been added');
    }
  });
});

//Display a specific simcard
app.get('/getsimcardbyid', (req, res) => {
  Simcard.findOne({ _id: req.body.simcardId })
    .populate('clients')
    .exec((err, simcard) => {
      if (err) return handleError(err);
      res.send(simcard);
    });
});

//Add simcard to client
app.post('/addsimtoclient', (req, res) => {
  Client.updateOne(
    { _id: req.body.clientId },
    { $addToSet: { simcards: [req.body.simcardId] } },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Simcard has been added');
      }
    }
  ).exec();
});

// Delete specific client's simcard
app.delete('/deletesimfromclient', (req, res) => {
  Client.findOne({ _id: req.body.clientId }).exec((err, client) => {
    client.simcards.pull({ _id: req.body.simcardId });
    if (err) return handleError(err);
    client.save();
    res.send('Simcard has been deleted');
  });
});

module.exports = createSimcard;
