const mongoose = require('mongoose');
require('colors');

const connectDb = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});
    console.log(`MongoDB connected to ${conn.connection.host}..`.green.underline.bold);
  }catch(err){
    console.log(`Error connecting DB: ${err.message}`.red.bold);
    process.exit(1)
  }
  
}

module.exports = connectDb;