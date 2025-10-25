// config/db.js
import mongoose from 'mongoose';

const connectDb = async (uri) => {
  if (!uri) throw new Error('MongoDB URI is required');

  // Optional: control query strictness
  // mongoose.set('strictQuery', true);

  try {
    // Mongoose >=6/7/8: don't pass deprecated driver options
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected successfully — host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDb;

// Graceful shutdown: close mongoose connection on process termination signals
const gracefulClose = async (signal) => {
  try {
    console.info(`${signal} received — closing MongoDB connection`);
    // The 'close' call returns a promise only starting from some mongoose versions;
    // using mongoose.connection.close() works across versions.
    await mongoose.connection.close(false);
    console.info('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB graceful shutdown', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulClose('SIGINT'));
process.on('SIGTERM', () => gracefulClose('SIGTERM'));

// Optional: handle uncaught exceptions/rejections to attempt a clean shutdown
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulClose('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  gracefulClose('unhandledRejection');
});
