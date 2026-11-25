const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    // First attempt to connect to the configured MONGO_URI
    if (mongoUri && mongoUri.trim() !== '') {
      try {
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 2500, // Quick timeout to check availability
        });
        console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
        return conn;
      } catch (err) {
        console.warn(`[MongoDB] Primary connection failed: ${err.message}`);
        if (process.env.NODE_ENV === 'production') {
          throw err;
        }
      }
    }

    // In development or when local/Atlas daemon is not active, spin up MongoMemoryServer
    console.log('[MongoDB] Starting MongoMemoryServer for reliable seamless local development...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongoMemoryServer = await MongoMemoryServer.create();
    const memoryUri = mongoMemoryServer.getUri();

    const conn = await mongoose.connect(memoryUri);
    console.log(`[MongoDB] Connected to in-memory instance at: ${memoryUri}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Critical Error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  } catch (err) {
    console.error('[MongoDB] Disconnect error:', err.message);
  }
};

module.exports = { connectDB, disconnectDB };
