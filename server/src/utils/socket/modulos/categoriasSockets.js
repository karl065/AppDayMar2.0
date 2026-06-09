const categoriasSockets = (io, socket) => {
	socket.on('categoria:creada', (data) => {
		socket.broadcast.emit('categoria:agregar', data);
	});

	socket.on('categoria:actualizada', (data) => {
		socket.broadcast.emit('categoria:recargar', data);
	});

	socket.on('categoria:eliminada', (id) => {
		socket.broadcast.emit('categoria:quitar', id);
	});
};

export default categoriasSockets;
