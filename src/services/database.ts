import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

export async function connectToDatabase(): Promise<void> {
  console.log("connecting to database...");

  try {
    if (uri) {
      mongoose.set("debug", true);
      await mongoose.connect(uri, {
        dbName,
        retryReads: true,
        retryWrites: true,
        connectTimeoutMS: 12000,
      });
    } else throw new Error("No database url provided");
  } catch (error: Error | any) {
    throw new Error(error.message);
  }

  console.log("connected to database");
}
