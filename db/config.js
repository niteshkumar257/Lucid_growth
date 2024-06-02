import mongoose from "mongoose";


const connectDb = async () => {
  try {
    const connectionInfo =await mongoose.connect(
      `${process.env.MONGO_URI}/`
    );
     console.log(`Db connected ${connectionInfo.connection.host}`)
  } catch (err) {
    console.log(`Error in database connection , ${err}`);
    process.exit(1);
  }
};

export default connectDb;