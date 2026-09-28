import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/armor_fit";

interface GlobalWithMongoose {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    isMock?: boolean;
  };
}

declare const global: GlobalWithMongoose;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ isMock: boolean; client?: typeof mongoose }> {
  if (cached && cached.conn) {
    return { isMock: false, client: cached.conn };
  }

  if (!cached) {
    cached = { conn: null, promise: null };
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Quick timeout if local mongo is offline
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("[MongoDB] Direct connection failed, operating with in-memory persistence fallback:", err.message);
        cached!.isMock = true;
        return null as unknown as typeof mongoose;
      });
  }

  try {
    const instance = await cached.promise;
    if (instance) {
      cached.conn = instance;
      return { isMock: false, client: cached.conn };
    }
  } catch (error) {
    console.warn("[MongoDB] Using fallback storage mode:", error);
  }

  return { isMock: true };
}
