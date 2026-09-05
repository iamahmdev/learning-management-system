import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/school_management_system";

    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error(
      `MongoDB connection failed: ${error.message}`
    );

    throw error;
  }
};

export default connectDB;