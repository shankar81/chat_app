import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log('mongodb connectd ', conn.connection.host)
  } catch (error) {
    console.log('mongodb connection error:', error.message)
  }
};
