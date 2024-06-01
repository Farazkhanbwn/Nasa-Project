
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT ?? 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is running on :", PORT);
});

app.use("/", (_, res) => {
  res.send("<h3>Hello We are Learning</h3>");
});

// app.listen("/" , ()=>{
//     console.log("server is running on Port" , PORT)
// })
