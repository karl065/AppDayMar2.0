const productosSockets = (io, socket) => {
	socket.on('producto:creado', (data) => {
		socket.broadcast.emit('producto:agregar', data);
	});

	socket.on('producto:actualizado', (data) => {
		socket.broadcast.emit('producto:recargar', data);
	});

	socket.on('producto:eliminado', (id) => {
		socket.broadcast.emit('producto:quitar', id);
	});
};

export default productosSockets;
