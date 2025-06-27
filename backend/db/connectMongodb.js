import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONFIG);
    console.log(`Mongodb connected: ${conn.connection.host}`)

  } catch (error) {
    console.log(`Error connecting to Mongodb: ${error.message}`)
    process.exit(1);
  }
};

export default connectMongoDb;
