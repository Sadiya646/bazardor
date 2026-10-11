import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_DB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_DB_URL is missing from .env");
}

const client = new MongoClient(mongoUrl);
const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  // লোকালহস্টে কুকি সিকিউরিটি ও রিডাইরেক্ট স্মুথ করার জন্য এটি জরুরি
  trustedOrigins: ["http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // লগইন বা সাইনআপ করার পর অটো সেশন জেনারেট করবে
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.BETTER_GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.BETTER_GITHUB_CLIENT_ID!,
      clientSecret: process.env.BETTER_GITHUB_CLIENT_SECRET!,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});