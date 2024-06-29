require("dotenv").config();
console.log("Environment Variables:", process.env.PORT, process.env.MONGO_URL);
const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./utils/mongo");

const PORT = process.env.PORT ?? 8000;
const server = http.createServer(app);

app.use("/", (req, res) => {
  res.send("<h3>Hello We are Learning...</h3>");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

const startServer = async () => {
  try {
    await mongoConnect();
    await loadPlanetsData();
    server.listen(PORT, () => {
      console.log("Server is running on:", PORT);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

startServer();
