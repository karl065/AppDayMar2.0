import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuarios from '../../models/Usuarios.js';

dotenv.config();

const { SECRETA } = process.env;

const loginController = async ({ correo, password }) => {
	try {
		const usuario = await Usuarios.findOne({ correo });
		if (!usuario) throw new Error('Credenciales incorrectas');

		// Validar contraseña
		const passOk = await bcryptjs.compare(password, usuario.password);
		if (!passOk) throw new Error('Credenciales incorrectas');

		// Generar JWT directamente
		const token = jwt.sign(
			{ id: usuario._id, role: usuario.role, correo: usuario.correo },
			SECRET,
			{ expiresIn: '7d' },
		);

		return {
			token,
			usuario: {
				id: usuario._id,
				nombre: usuario.nombre, // Asegúrate de traer lo que necesites
				rol: usuario.rol,
			},
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default loginController;
