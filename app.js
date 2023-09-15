// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transferRoutes = require("./routes/transfer");
const Account = require("./models/account"); // Import mô hình tài khoản

const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://adminBank:adminBank@banktransfer.cfcbgpr.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());
app.use("/api", transferRoutes);
app.get("/api/account/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  try {
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ error: "Tài khoản không tồn tại" });
    }

    return res.json({ balance: account.balance });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi khi kiểm tra số dư" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
