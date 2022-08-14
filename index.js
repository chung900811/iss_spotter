const fetchMyIP = require('./iss');
const fetchCoordsByIP = require('./iss')
const fetchISSFlyOverTimes = require('./iss')
const nextISSTimesForMyLocation = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// let ip = "24.85.12.11";
// fetchCoordsByIP(ip, (error, location) => {
//   if (error) {
//     console.log("It didn't work!" , error)
//     return;
//   } 
//   console.log(location);
// })

  // let lat = { latitude: 49.2827291, longitude: -123.1207375 }
  // fetchISSFlyOverTimes (lat, (error, passes) => {
  //   if (error) {
  //     console.log("It didn't work!" , error);
  //     return;
  //   } console.log(passes)
  // })


  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
      for (const pass of passTimes) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
      }
  });
