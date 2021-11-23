const mongoose = require('mongoose');
const dotenv = require('dotenv');
const debug = require('debug')('dbconnect');

dotenv.config();

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debug('Connected to DB');
  } catch (error) {
    debug(error);
  }
};

module.exports = connect_db;
