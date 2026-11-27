const mongoose = require('mongoose');

let mongoMemoryServer = null;

/**
 * Safely URL-encodes extra '@' characters inside the password segment of a MongoDB URI
 * (e.g., if a password contains '@' and was pasted without '%40' encoding).
 */
const normalizeMongoUri = (rawUri) => {
  const schemeIdx = rawUri.indexOf('://');
  if (schemeIdx === -1) return rawUri;

  const scheme = rawUri.slice(0, schemeIdx + 3);
  const rest = rawUri.slice(schemeIdx + 3);
  const slashIdx = rest.indexOf('/');
  const authority = slashIdx === -1 ? rest : rest.slice(0, slashIdx);
  const pathAndQuery = slashIdx === -1 ? '' : rest.slice(slashIdx);

  const lastAtIdx = authority.lastIndexOf('@');
  if (lastAtIdx === -1) return rawUri;

  const userInfo = authority.slice(0, lastAtIdx);
  const host = authority.slice(lastAtIdx + 1);
  if (!userInfo.includes('@')) return rawUri;

  const safeUserInfo = userInfo.replace(/@/g, '%40');
  return `${scheme}${safeUserInfo}@${host}${pathAndQuery}`;
};

const connectDB = async () => {
  try {
    const rawUri = (process.env.MONGO_URI || process.env.MONGODB_URI || '').trim();
    const mongoUri = normalizeMongoUri(rawUri);
    const isProduction = process.env.NODE_ENV === 'production';
    const isAtlasUri = mongoUri.startsWith('mongodb+srv://');

    if (mongoUri !== '') {
      // Check for unreplaced placeholder credentials
      if (mongoUri.includes('<username>') || mongoUri.includes('<password>') || mongoUri.includes('<cluster>')) {
        throw new Error(
          'MONGO_URI still contains placeholder values (<username>, <password>, or <cluster>). Please replace them with your actual MongoDB Atlas credentials.'
        );
      }

      try {
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: isAtlasUri || isProduction ? 15000 : 3000,
          socketTimeoutMS: 45000,
        });
        console.log(
          `[MongoDB] Connected successfully (${isAtlasUri ? 'MongoDB Atlas' : 'Standard'}) -> Host: ${conn.connection.host}, DB: ${conn.connection.name}`
        );
        return conn;
      } catch (err) {
        console.error(`[MongoDB] Connection failed: ${err.message}`);
        if (isAtlasUri) {
          console.error(
            '[MongoDB Atlas Hint] Verify: (1) Database user & URL-encoded password, (2) Atlas Network Access allows 0.0.0.0/0 or your current IP, (3) Database name is included in MONGO_URI.'
          );
        }
        if (isProduction || isAtlasUri) {
          throw err;
        }
      }
    }

    // Development-only fallback when local MongoDB daemon is not running and no Atlas URI is configured
    console.log('[MongoDB] Starting MongoMemoryServer for local development fallback...');
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
