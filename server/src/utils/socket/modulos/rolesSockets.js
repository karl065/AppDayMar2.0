const rolesSockets = (io, socket) => {
	socket.on('rol:creado', (data) => {
		socket.broadcast.emit('rol:agregar', data);
	});

	socket.on('rol:actualizado', (data) => {
		socket.broadcast.emit('rol:recargar', data);
	});

	socket.on('rol:eliminado', (id) => {
		socket.broadcast.emit('rol:quitar', id);
	});
};

export default rolesSockets;
