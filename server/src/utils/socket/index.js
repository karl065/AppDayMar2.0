// src/sockets/index.js

import categoriasSockets from './modulos/categoriasSockets.js';
import productosSockets from './modulos/productosSockets.js';
import rolesSockets from './modulos/rolesSockets.js';
import tiposSockets from './modulos/tiposSockets.js';
import usuariosSockets from './modulos/usuariosSockets.js';

const registerSocketModules = (io) => {
	io.on('connection', (socket) => {
		console.log('Cliente conectado:', socket.id);

		// Registrar módulos
		usuariosSockets(io, socket);
		productosSockets(io, socket);
		categoriasSockets(io, socket);
		tiposSockets(io, socket);
		rolesSockets(io, socket);

		socket.on('disconnect', () => {
			console.log('Cliente desconectado:', socket.id);
		});
	});
};

export default registerSocketModules;
