// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const loanRoutes = require("./routes/loanRoutes.js");


 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // Use auth routes
app.use("/loans", loanRoutes); // Use loan routes
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to ZK-Bank Privacy Loan (Binance) API!",
      availableEndpoints: ["/auth", "/loans"]
    });
  });
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
module.exports = app;