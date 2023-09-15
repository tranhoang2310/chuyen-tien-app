// models/account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
