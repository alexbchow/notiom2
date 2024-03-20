// /src/db/connect.ts
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(); // Default to the default database
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    process.exit(1);
  }
}

export async function disconnect() {
  await client.close();
}
