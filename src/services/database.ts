import mongoose from "mongoose";
import dotenv from "dotenv";
import * as firebase from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "./service-account.json";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const mediaStorage = firebase.storage().bucket();

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
