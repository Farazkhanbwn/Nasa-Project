const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL ?? "mongodb://localhost:27017/nasa-project";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
  // Changed from .once to .on for error handling
  console.error("Error value is: ", error);
});

async function mongoConnect() {
  if (!MONGO_URL) {
    throw new Error("auth DB_URI must be defined");
  }
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Server connected to MongoDb!");
  } catch (err) {
    throw new DbConnectionError();
    // console.error(err);
  }
  // console.log("mongo Url is : ", MONGO_URL);
  // await mongoose.connect(MONGO_URL);
  // console.log("Connected to MongoDB");
}

async function mongoDisconnect() {
  await mongoose.disconnect();
  console.log("Disconnected to MongoDB");
}

module.exports = { mongoConnect, mongoDisconnect };
