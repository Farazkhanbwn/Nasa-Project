const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT ?? 8000;
const server = http.createServer(app);

app.use("/", (_, res) => {
  res.send("<h3>Hello We are Learning...</h3>");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

(async () => {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log("Server is running on : ", PORT);
  });
})();
