// clientX.js
const axios = require("axios");

// Thay đổi các giá trị sau để phù hợp với tài khoản của bạn
const fromAccount = "accountX"; // Tài khoản nguồn
const toAccount = "accountY"; // Tài khoản đích
const transferAmount = 100; // Số tiền chuyển

async function checkBalance(accountNumber) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/account/${accountNumber}`
    );
    const balance = response.data.balance;
    console.log(`Số dư tài khoản ${accountNumber}: ${balance}`);
  } catch (error) {
    console.error(`Lỗi khi kiểm tra số dư: ${error.response.data.error}`);
  }
}

async function transferMoney(fromAccount, toAccount, amount) {
  const data = {
    fromAccount: fromAccount,
    toAccount: toAccount,
    amount: amount,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/transfer",
      data
    );
    console.log(response.data.message);
    console.log(
      `Số dư tài khoản ${fromAccount} sau khi chuyển tiền: ${response.data.senderBalance}`
    );
    // console.log(
    //   `Số dư tài khoản ${toAccount} sau khi nhận tiền: ${response.data.receiverBalance}`
    // );
  } catch (error) {
    console.error(`Lỗi khi chuyển tiền: ${error.response.data.error}`);
  }
}

// Kiểm tra số dư tài khoản nguồn
checkBalance(fromAccount);

// Chuyển số tiền
transferMoney(fromAccount, toAccount, transferAmount);
