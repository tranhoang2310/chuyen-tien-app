// routes/transfer.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Account = require("../models/account");

router.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { fromAccount, toAccount, amount } = req.body;

    const senderAccount = await Account.findOne({
      accountNumber: fromAccount,
    }).session(session);
    const receiverAccount = await Account.findOne({
      accountNumber: toAccount,
    }).session(session);

    if (!senderAccount || !receiverAccount) {
      throw new Error("Invalid account number");
    }

    if (senderAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save();
    await receiverAccount.save();

    await session.commitTransaction();
    session.endSession();

    // Lấy số dư mới của cả hai tài khoản sau khi chuyển tiền
    const newSenderAccount = await Account.findOne({
      accountNumber: fromAccount,
    });
    const newReceiverAccount = await Account.findOne({
      accountNumber: toAccount,
    });

    res.json({
      message: "Transfer successful",
      senderBalance: newSenderAccount.balance, // Gửi số dư tài khoản nguồn sau khi chuyển tiền
      receiverBalance: newReceiverAccount.balance, // Gửi số dư tài khoản đích sau khi nhận tiền
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
