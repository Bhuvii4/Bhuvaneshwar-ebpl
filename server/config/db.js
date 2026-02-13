const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Could not connect to MongoDB URI. Attempting to start in-memory database...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
            console.log('NOTE: Data will be lost when the server restarts.');
        } catch (innerError) {
            console.error(`Error: ${innerError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
