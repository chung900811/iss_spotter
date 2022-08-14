// // // const { response } = require('express');
// const { json } = require('body-parser');
// const { response } = require('express');
const { response } = require('express');
const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json",(error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
      callback(null, ip);
  });
};

module.exports = fetchMyIP;

const fetchCoordsByIP = function(ip, callback) {
  let url = `http://ipwho.is/${ip}`
  request(url, (error, response, body) => {
    if (error){
    callback(error, null)
    return;
  } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
    return    
  } 
    let latitude = JSON.parse(body).latitude
    let longitude = JSON.parse(body).longitude
    let location = {latitude,longitude}
    callback(null, location)
  })
}

module.exports = fetchCoordsByIP;

const fetchISSFlyOverTimes = function(coords, callback) {
  let lat = coords.latitude
  let lon = coords.longitude
  let url = `https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`
  request (url, (error, response, body) => {
    if (error) {
      callback (error, null);
      return;
    } 
    if (response.statusCode != 200) {
      callback(error,(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`))
    }
    let passes = JSON.parse(body).response
    callback(null, passes)
  })
}
  module.exports = fetchISSFlyOverTimes

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
      
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = nextISSTimesForMyLocation;

