const express = require("express");
const cors = require("cors");

const brandRoutes = require("./routes/brandRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/brands", brandRoutes);
app.use("/chat", chatRoutes);

module.exports = app;