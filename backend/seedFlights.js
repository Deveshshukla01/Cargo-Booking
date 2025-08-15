const mongoose = require('mongoose');
const Flight = require('./models/Flight');
require('dotenv').config();

const sampleFlights = [
  // Direct flights DEL-BLR
  {
    flightId: 'AI101',
    flightNumber: 'AI-101',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T10:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T12:30:00Z'),
    origin: 'DEL',
    destination: 'BLR'
  },
  {
    flightId: 'SG202',
    flightNumber: 'SG-202',
    airlineName: 'SpiceJet',
    departureDateTime: new Date('2025-08-15T14:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T16:30:00Z'),
    origin: 'DEL',
    destination: 'BLR'
  },

  // Direct flights MAA-BLR
  {
    flightId: 'AI501',
    flightNumber: 'AI-501',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T09:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T10:30:00Z'),
    origin: 'MAA',
    destination: 'BLR'
  },
  {
    flightId: 'IG601',
    flightNumber: 'IG-601',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-15T15:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T16:30:00Z'),
    origin: 'MAA',
    destination: 'BLR'
  },
  {
    flightId: 'SG701',
    flightNumber: 'SG-701',
    airlineName: 'SpiceJet',
    departureDateTime: new Date('2025-08-15T18:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T19:30:00Z'),
    origin: 'MAA',
    destination: 'BLR'
  },

  // Direct flights BLR-MAA
  {
    flightId: 'AI502',
    flightNumber: 'AI-502',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T11:30:00Z'),
    arrivalDateTime: new Date('2025-08-15T13:00:00Z'),
    origin: 'BLR',
    destination: 'MAA'
  },
  {
    flightId: 'IG602',
    flightNumber: 'IG-602',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-15T17:30:00Z'),
    arrivalDateTime: new Date('2025-08-15T19:00:00Z'),
    origin: 'BLR',
    destination: 'MAA'
  },

  // Transit flights - DEL to HYD
  {
    flightId: 'AI201',
    flightNumber: 'AI-201',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T08:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T10:30:00Z'),
    origin: 'DEL',
    destination: 'HYD'
  },

  // HYD to BLR (for transit routes)
  {
    flightId: 'IG301',
    flightNumber: 'IG-301',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-15T12:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T13:30:00Z'),
    origin: 'HYD',
    destination: 'BLR'
  },
  {
    flightId: 'IG302',
    flightNumber: 'IG-302',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-16T09:00:00Z'),
    arrivalDateTime: new Date('2025-08-16T10:30:00Z'),
    origin: 'HYD',
    destination: 'BLR'
  },

  // MAA to HYD (for transit routes)
  {
    flightId: 'AI801',
    flightNumber: 'AI-801',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T07:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T08:30:00Z'),
    origin: 'MAA',
    destination: 'HYD'
  },
  {
    flightId: 'SG802',
    flightNumber: 'SG-802',
    airlineName: 'SpiceJet',
    departureDateTime: new Date('2025-08-15T13:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T14:30:00Z'),
    origin: 'MAA',
    destination: 'HYD'
  },

  // HYD to BLR (connecting flights)
  {
    flightId: 'IG303',
    flightNumber: 'IG-303',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-15T10:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T11:30:00Z'),
    origin: 'HYD',
    destination: 'BLR'
  },
  {
    flightId: 'AI304',
    flightNumber: 'AI-304',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T16:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T17:30:00Z'),
    origin: 'HYD',
    destination: 'BLR'
  },

  // More routes for variety
  {
    flightId: 'SG401',
    flightNumber: 'SG-401',
    airlineName: 'SpiceJet',
    departureDateTime: new Date('2025-08-15T11:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T13:00:00Z'),
    origin: 'DEL',
    destination: 'MAA'
  },
  {
    flightId: 'AI901',
    flightNumber: 'AI-901',
    airlineName: 'Air India',
    departureDateTime: new Date('2025-08-15T16:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T18:00:00Z'),
    origin: 'BLR',
    destination: 'BOM'
  },
  {
    flightId: 'IG902',
    flightNumber: 'IG-902',
    airlineName: 'IndiGo',
    departureDateTime: new Date('2025-08-15T12:00:00Z'),
    arrivalDateTime: new Date('2025-08-15T14:00:00Z'),
    origin: 'MAA',
    destination: 'BOM'
  }
];

async function seedFlights() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cargoapp');
    console.log('Connected to MongoDB');

    // Clear existing flights
    await Flight.deleteMany({});
    console.log('Cleared existing flights');

    // Insert sample flights
    await Flight.insertMany(sampleFlights);
    console.log('Sample flights inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding flights:', error);
    process.exit(1);
  }
}

seedFlights();
