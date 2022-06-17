const { nextISSTimesForMyLocation } = require("./iss-promised");


nextISSTimesForMyLocation()
  .then(passTimes => {
  printOut(JSON.parse(passTimes).response)
  })
  .catch(error => {
    console.log("Error: ", error.message);
  })

const printOut = function (passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime}, for ${duration} seconds!`);
  }
};