// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import loanRoutes from "./routes/loanRoutes.js"; // Import loan routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // Use auth routes
app.use("/loans", loanRoutes); // Use loan routes



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
