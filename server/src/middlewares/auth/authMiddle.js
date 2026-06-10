import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import putControllerUsuarios from './../../controllers/controllersUsuarios/putControllerUsuarios.js';
dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.cookies.token; // viene de cookie httpOnly

		console.log('Token ', token);
		if (!token) {
			throw new Error('No hay token');
		}

		let decoded;

		try {
			decoded = jwt.verify(token, SECRETA);
		} catch (err) {
			if (err.name === 'TokenExpiredError') {
				await putControllerUsuarios({ userStatus: false }, decoded.id);
				throw new Error('Token expirado');
			}
			await putControllerUsuarios({ userStatus: false }, decoded.id);

			throw new Error('Token no válido');
		}

		req.usuario = decoded;
		next();
	} catch (error) {
		console.log(error.message);
		return res.status(401).json({ msg: error.message });
	}
};

export default authMiddle;
