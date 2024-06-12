import mongoose, { Mongoose } from 'mongoose'

// Environment variables
const MONGODB_URL = process.env.MONGODB_URL

// Cached connection to MongoDB
interface MongooseConnection {
    // Connection to MongoDB
    conn: Mongoose | null
    // Promise that resolves to connection to MongoDB
    promise: Promise<Mongoose> | null
}

// Global cache for MongoDB connection
let cached: MongooseConnection = (global as any).mongoose

// If cache is not initialized, initialize it
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

/**
 * Connect to MongoDB.
 * If connection is already established, return it.
 * Otherwise, establish a new connection and return it.
 * @returns Promise that resolves to MongoDB connection
 */
export const connectToDatabase = async () => {
    
    // If connection is already established, return it
    if (cached.conn) return cached.conn

    // If MongoDB URL is not provided, throw an error
    if (!MONGODB_URL) throw new Error('Mongodb URL not found')

    // If connection promise is not initialized, initialize it
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { 
        // Name of the database to connect to
        dbName: process.env.DB_NAME, 
        // Disable buffering of MongoDB commands
        bufferCommands: false 
    })

    // Wait for connection promise to resolve and store it in cache
    cached.conn = await cached.promise
    
    // Return connection
    return cached.conn
    
}
