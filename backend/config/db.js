const mongoose = require('mongoose');

const connectDB = async ()=>{
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    })
    try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;