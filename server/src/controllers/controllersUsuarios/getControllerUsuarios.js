import UsuariosModel from './../../models/Usuarios.js';

const getControllerUsuarios = async (filtros) => {
	try {
		const usuarios = await UsuariosModel.find(filtros).select('-password');
		return usuarios;
	} catch (error) {
		return error;
	}
};

export default getControllerUsuarios;
