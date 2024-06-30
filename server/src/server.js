const http = require("http");
require("dotenv").config();
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");
const { loadLaunchDate } = require("./models/launches.model");

const PORT = process.env.PORT ?? 4000;
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
    await loadLaunchDate();
    server.listen(PORT, () => {
      console.log("Server is running on:", PORT);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

startServer();
