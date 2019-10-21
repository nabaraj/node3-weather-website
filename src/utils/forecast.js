const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/b2a2c9ee592d018d17487539097810f0/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      let maxTemp = -Infinity,
        minTemp = Infinity;
      body.daily.data.map(item => {
        if (maxTemp < item.temperatureHigh) {
          maxTemp = item.temperatureHigh;
        }
        minTemp = minTemp > item.temperatureLow ? item.temperatureLow : minTemp;
      });

      callback(
        undefined,
        `${body.daily.data[0].summary}
          It is currently
          ${body.currently.temperature}
           degress out. There is a 
          ${body.currently.precipProbability}
           % chance of rain. Max-temp: ${maxTemp}, 
           Min-temp: ${minTemp}`
      );
    }
  });
};

module.exports = forecast;
