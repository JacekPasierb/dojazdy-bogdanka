import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
}

const uri = MONGODB_URI;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

const globalWithCache = globalThis as unknown as {
    _mongoose?: MongooseCache;
};

const cache: MongooseCache = globalWithCache._mongoose ?? {
    conn: null,
    promise: null,
};

globalWithCache._mongoose = cache;

export async function dbConnect() {
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(uri, {
            bufferCommands: false,
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}
