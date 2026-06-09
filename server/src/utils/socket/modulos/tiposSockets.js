const tiposSockets = (io, socket) => {
	socket.on('tipo:creado', (data) => {
		socket.broadcast.emit('tipo:agregar', data);
	});

	socket.on('tipo:actualizado', (data) => {
		socket.broadcast.emit('tipo:recargar', data);
	});

	socket.on('tipo:eliminado', (id) => {
		socket.broadcast.emit('tipo:quitar', id);
	});
};

export default tiposSockets;
