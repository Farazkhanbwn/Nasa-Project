require("dotenv").config();
console.log("Environment Variables:", process.env.PORT, process.env.MONGO_URL);
const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

const PORT = process.env.PORT ?? 8000;
const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017/nasa-api";
const server = http.createServer(app);

app.use("/", (req, res) => {
  res.send("<h3>Hello We are Learning...</h3>");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
  // Changed from .once to .on for error handling
  console.error("Error value is: ", error);
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
    await loadPlanetsData();
    server.listen(PORT, () => {
      console.log("Server is running on:", PORT);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

startServer();
