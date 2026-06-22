import sanitizarUsuario from './sanitizadorUsuarios.js';

const sanitizadorProductos = (producto) => {
	return {
		_id: producto._id,
		nombre: producto.nombre,
		imagen: producto.imagen,
		precio: producto.precio,
		stock: producto.stock,
		estado: producto.estado,
		descripcion: producto.descripcion,
		categoria: producto.categoria,
		usuario: sanitizarUsuario(producto.usuario),
	};
};

export default sanitizadorProductos;
