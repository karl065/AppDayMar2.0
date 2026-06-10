import express from 'express';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import router from './routes/indexRoutes.js';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const { FRONTEND_URL } = process.env;

const server = express();
const httpServer = http.createServer(server); // Crea un servidor HTTP
const io = new socketIO(httpServer, {
	cors: {
		origin: FRONTEND_URL, // Ajusta según tu configuración de React
		methods: ['GET', 'POST'],
		credentials: true,
	},
}); // Crea una instancia de Socket.io

server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(cookieParser());

// Cross-Origin-Opener-Policy configuration
server.use(
	helmet.crossOriginOpenerPolicy({
		policy: 'same-origin-allow-popups',
	}),
);

server.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	}),
);

server.use(router);

export { server, httpServer, io };
