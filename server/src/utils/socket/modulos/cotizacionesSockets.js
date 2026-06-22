const cotizacionesSockets = (io, socket) => {
	// Cuando el cliente emite una nueva cotización
	socket.on('cotizacion:creada', (data) => {
		// Broadcast para que los administradores vean la nueva cotización al instante
		socket.broadcast.emit('cotizacion:agregar', data);
	});

	// Cuando el admin actualiza una cotización (asigna precios/disponibilidad)
	socket.on('cotizacion:actualizada', (data) => {
		// Broadcast para que todos los conectados vean el cambio
		socket.broadcast.emit('cotizacion:recargar', data);
	});

	// Cuando se elimina una cotización
	socket.on('cotizacion:eliminada', (id) => {
		// Broadcast para quitarla de la lista de todos los conectados
		socket.broadcast.emit('cotizacion:quitar', id);
	});
};

export default cotizacionesSockets;
