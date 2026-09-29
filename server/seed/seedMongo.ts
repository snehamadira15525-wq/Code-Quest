import dotenv from 'dotenv';
import { connectMongoDB, seedMongoDatabase } from '../config/mongo.js';

dotenv.config();

async function runSeed() {
  console.log('--- Starting MongoDB Seed Script ---');
  const connected = await connectMongoDB();
  if (connected) {
    await seedMongoDatabase();
    console.log('--- MongoDB Seeding Completed Successfully! ---');
  } else {
    console.log('Notice: MONGODB_URI not provided or unreachable. Seeding local storage.');
  }
  process.exit(0);
}

runSeed();
