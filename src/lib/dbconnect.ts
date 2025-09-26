import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the DBURI environment variable");
}

type ConnectionType = {
  isConnected?: number;
};
const connection: ConnectionType = {};

const DBConnect = async () => {
  if (connection.isConnected) {
    // Connect to the database
    console.log("Already connected to the database");
    return;
  }

  try {
    // Connect to the database
    const dbInstance = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = dbInstance.connections[0].readyState;
    // console.log("Connecting to the database...");
    // connection.isConnected = 1;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

export { DBConnect };
