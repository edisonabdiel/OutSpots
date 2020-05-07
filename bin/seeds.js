
const mongoose = require('mongoose');
const Dogpark = require('../models/Dogpark');

mongoose.connect(`mongodb://127.0.0.1:27017/outspots`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dogparks = [
  {
    name: 'Hundeplatz Revaler Str.',
    address: 'Revaler Str. 17 10245 Berlin',
    facilities: {
      waterSupply: true, 
      seatingSpaces: true, 
      smallDogsArea: false,
    },
    ground: 'dirt',
    isFenced: true
  }
];

Dogpark.create(dogparks)
.then(() => {
  console.log(`Created ${dogparks.length} dogpark(s)`);
  mongoose.connection.close();
});

