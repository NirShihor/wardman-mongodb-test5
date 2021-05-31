const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    accountNumber: { type: Number },
    clientName: { type: String },
    internalComments: { type: String },
    simcards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Simcard',
      },
    ],
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
