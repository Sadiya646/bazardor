import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL || "");
const db = client.db();

export const auth = betterAuth({

     emailAndPassword: {
    enabled: true, // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন/আপ করার জন্য এটি জরুরি
  },
  
  database: mongodbAdapter(db, {
    client,
  }),
 
});