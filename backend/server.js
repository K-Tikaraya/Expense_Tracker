require("dotenv").config();
const express = require("express");
const Cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

// Middleware to handle CORS
app.use(
    Cors({
        origin: process.env.CLIENT_URL ||"*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());
// console.log("Mongo URI:", process.env.MONGO_URI); 
connectDB();

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

// Income routes
// app.use('/api/v1/income', incomeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`server running on port ${PORT}`));