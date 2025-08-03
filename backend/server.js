require("dotenv").config();
const express = require("express");
const Cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to handle CORS
app.use(
    Cors({
        origin: process.env.CLIENT_URL ||"*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
// console.log("Mongo URI:", process.env.MONGO_URI); 
connectDB();

app.use("/api/v1/auth",authRoutes);


// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`server running on port ${PORT}`));