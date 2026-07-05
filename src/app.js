const express = require("express");
const cors = require("cors");

const brandRoutes = require("./routes/brandRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Brand Assistant Backend is running 🚀"
  });
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy"
  });
});

app.use("/brands", brandRoutes);
app.use("/chat", chatRoutes);

module.exports = app;