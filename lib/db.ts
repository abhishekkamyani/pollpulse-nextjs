import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global as typeof globalThis & {
    mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.mongoose!.conn) return cached.mongoose!.conn   // already connected, reuse
  
    if (!cached.mongoose!.promise) {
        cached.mongoose!.promise = mongoose.connect(MONGODB_URI) // first time, start connecting
    }
  
    cached.mongoose!.conn = await cached.mongoose!.promise     // wait and cache it
    return cached.mongoose!.conn;
}