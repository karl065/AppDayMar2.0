const subCategoriasSockets = (io, socket) => {
	socket.on('subcategoria:creada', (data) => {
		socket.broadcast.emit('subcategoria:agregar', data);
	});

	socket.on('subcategoria:actualizada', (data) => {
		socket.broadcast.emit('subcategoria:recargar', data);
	});

	socket.on('subcategoria:eliminada', (id) => {
		socket.broadcast.emit('subcategoria:quitar', id);
	});
};

export default subCategoriasSockets;
