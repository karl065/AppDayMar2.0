import { createConnection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_MONGODB = process.env.DB_MONGODB;

const mongoOptions = {
	maxPoolSize: 200,
	maxConnecting: 200,
};

const connection = createConnection(DB_MONGODB, mongoOptions);

connection.on('connected', () => {
	console.log('MongoDB Conectada');
});

connection.on('error', (error) => {
	console.error('Error de conexión MongoDB:', error);
});

export default connection;
