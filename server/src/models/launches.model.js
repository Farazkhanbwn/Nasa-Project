// const launches = require("./launches.mongo");

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,  
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customers: ["Zero to Mastery", "Nasa"],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(lauchId) {
  const aborted = launches.get(lauchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
