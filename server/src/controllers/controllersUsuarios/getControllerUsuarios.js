import Usuarios from './../../models/Usuarios.js';

const getControllerUsuarios = async (filtros) => {
	try {
		const usuarios = await Usuarios.find(filtros)
			.select('-password')
			.populate('rol');
		return usuarios;
	} catch (error) {
		throw error;
	}
};

export default getControllerUsuarios;
