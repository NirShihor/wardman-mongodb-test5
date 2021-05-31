const mongoose = require('mongoose');

const SimcardSchema = new mongoose.Schema(
  {
    name: { type: String },
    assignedTo: { type: String },
    externalComments: { type: String },
    internalComments: { type: String },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
      },
    ],
  },
  { timestamps: true }
);

const Simcard = mongoose.model('Simcard', SimcardSchema);

module.exports = Simcard;
