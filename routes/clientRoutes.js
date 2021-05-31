const express = require('express');
const Client = require('../models/Client');
const Simcard = require('../models/Simcard');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();

// Add A New Client
const createClient = app.post('/addclient', bodyParser, (req, res) => {
  const NewClient = new Client({
    accountNumber: req.body.accountNumber,
    clientName: req.body.clientName,
    internalComments: req.body.internalComments,
    simcards: req.body.simcards,
  });
  NewClient.save()
    .then(() => {
      res.send('Client has been added successfully');
    })
    .catch(() => {
      res.send('Something went wrong...');
    });
});

// Display all clients
app.get('/getclients', (req, res) => {
  Client.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(err);
      res.send('Something went wrong...');
    }
  });
});

//Display one client
app.get('/getclientbyid', (req, res) => {
  Client.findOne({ _id: req.body.clientId })
    .populate('simcards')
    .exec((err, client) => {
      if (err) return handleError(err);
      res.send(client);
    });
});

//Change client name
app.patch('/updateclientname', (req, res) => {
  const changeName = async (err) => {
    const filter = { clientName: req.body.name };
    const update = { clientName: req.body.newName };
    if (!err) {
      let doc = await Client.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      }).then();
      res.send('Client has been updated');
    } else {
      console.log(err);
    }
  };
  changeName();
});

// Get Client by Simcard
app.get('/getclientbysimcard', (req, res) => {
  Client.findOne({ simcards: req.body.simcardId }, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      res.send(client);
    }
  });
});

module.exports = createClient;
