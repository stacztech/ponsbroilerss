import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;
		if (!mongoUri) {
			console.error("MONGO_URI environment variable is not set");
			process.exit(1);
		}

		const conn = await mongoose.connect(mongoUri, {
			// Add connection options for better stability
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			bufferCommands: false,
			bufferMaxEntries: 0
		});
		
		console.log(`MongoDB Connected: ${conn.connection.host}`);
		
		// Handle connection events
		mongoose.connection.on('error', (err) => {
			console.error('MongoDB connection error:', err);
		});
		
		mongoose.connection.on('disconnected', () => {
			console.log('MongoDB disconnected');
		});
		
		// Graceful shutdown
		process.on('SIGINT', async () => {
			await mongoose.connection.close();
			console.log('MongoDB connection closed through app termination');
			process.exit(0);
		});
		
	} catch (error) {
		console.error("Error connecting to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};
