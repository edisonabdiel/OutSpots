const NodeGeocoder = require('node-geocoder');

const options = { 
  provider: 'opencage',
  httpAdapter: 'https',
  apiKey: 'cee7c89965a24504a299788edbb9d2b6',//process.env.OCD_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);


//You can also add formatter implementing the following interface
const formatter = {
  format: function (data) {
    return formattedData;
  }
};

module.exports = geocoder;

