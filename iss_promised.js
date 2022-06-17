const request = require('request-promise-native');

const fetchIP = (callback) => {
  return request("https://api.ipify.org?format=json")
}
const fetchLocation = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOver = (body) => {
  const location = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${location.latitude}&lon=${location.longitude}`)
}
const nextISSTimesForMyLocation = () => {
  return fetchIP()
    .then(fetchLocation)
    .then(fetchISSFlyOver)   
}



module.exports = {
  nextISSTimesForMyLocation
}