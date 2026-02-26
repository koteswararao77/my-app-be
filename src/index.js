const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const { connectDB, chatBotDB } = require("./mongoDb/config-db/db");
require("./mongoDb/config-db/db");

const userRoutes = require("./routes/userRoutes");
const loginRoutes = require('./Login/routeLogin');
const errorHandler = require("./middleware/errorMiddleware");
const logger = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(logger);

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://koteswararao77.github.io"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.use("/api", userRoutes);
app.use("/api/auth", loginRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
