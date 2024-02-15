import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { User } from '../schema/user/index.js';
import { Realestate } from '../schema/realestate/index.js';
import { Booking } from '../schema/booking/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mongod;

const updateDbWithRealestates = async (data) => {
  const richUser = await User.findOne({
    email: 'exampleuser@hotmail.com',
  });
  data.realestates.forEach((realestate) => {
    realestate.owner = richUser._id;
  });
  await Realestate.create(data.realestates);
  const richUsersRealestatesIds = await Realestate.find(
    { owner: richUser._id },
    { projection: { _id: 1 } }
  );
  richUser.ownedRealestates.push(...richUsersRealestatesIds);
  await richUser.save();
};

const getUserByEmail = async (email) => await User.findOne({ email }).lean();

const getRealestateByTitle = async (title) =>
  await Realestate.findOne({ title }).lean();

const updateDbWithBookings = async (data) => {
  const testUser = await getUserByEmail('testuser@yahoo.com');
  const anotherUser = await getUserByEmail('anotheremail@gmail.com');
  data.bookings.forEach((booking) => {
    booking.user = testUser._id;
  });
  data.bookings[0].user = anotherUser._id;

  const realestateDowntown = await getRealestateByTitle(
    'Cozy Studio in Downtown'
  );
  data.bookings[0].realestate = realestateDowntown;
  const realestateLuxuriousHouse = await getRealestateByTitle(
    'Luxurious 3-Bedroom House'
  );
  data.bookings[1].realestate = realestateLuxuriousHouse;
  const realestateBungalow = await getRealestateByTitle(
    'Charming Bungalow with Garden'
  );
  data.bookings[2].realestate = realestateBungalow;

  await Booking.create(data.bookings);
};

const imporDefaultData = async () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/test-data.json`, 'utf-8')
  );
  try {
    await User.create(data.users);
    await updateDbWithRealestates(data);
    await updateDbWithBookings(data);
  } catch (err) {
    console.log(err);
  }
};

const getBookingById = async (id) => await Booking.findById(id).lean();
const getUserById = async (id) => await User.findById(id).lean();
const getRealestateById = async (id) => await Realestate.findById(id).lean();

const getOneBooking = async () =>
  await Booking.findOne({}).populate('user').populate('realestate').lean();

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();

  await mongoose.connect(uri, {
    dbName: 'verifyGraphQLSprint',
  });

  await imporDefaultData();
};

const closeDatabase = async () => {
  await mongod.stop();
  await mongoose.connection.close();
};

const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  Object.keys(collections).forEach(async (key) => {
    const collection = collections[key];
    await collection.deleteMany();
  });
};

export default {
  imporDefaultData,
  connect,
  closeDatabase,
  clearDatabase,
  getUserByEmail,
  getRealestateByTitle,
  getBookingById,
  getUserById,
  getRealestateById,
  getOneBooking,
};
