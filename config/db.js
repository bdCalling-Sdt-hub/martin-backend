const mongoose = require("mongoose");

const dbConnection = async (DB_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "midhurst",
    };
    await mongoose.connect(DB_URL, DB_OPTIONS);
    console.log("🚀 Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;