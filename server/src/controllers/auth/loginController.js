import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuarios from '../../models/Usuarios.js';
import putControllerUsuarios from '../controllersUsuarios/putControllerUsuarios.js';

dotenv.config();

const { SECRETA } = process.env;

const loginController = async ({ correo, password }) => {
	try {
		const usuario = await Usuarios.findOne({ correo }).populate('rol');
		if (!usuario) throw new Error('Credenciales incorrectas');

		// Validar contraseña
		const passOk = await bcryptjs.compare(password, usuario.password);
		if (!passOk) throw new Error('Credenciales incorrectas');

		await putControllerUsuarios({ status: true }, usuario._id);

		// Generar JWT directamente
		const token = jwt.sign(
			{ id: usuario._id, role: usuario.role, correo: usuario.correo },
			SECRETA,
			{ expiresIn: '7d' },
		);

		return {
			token,
			usuario: {
				id: usuario._id,
				nombre: usuario.nombre, // Asegúrate de traer lo que necesites
				rol: usuario.rol,
				status: true,
			},
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default loginController;
