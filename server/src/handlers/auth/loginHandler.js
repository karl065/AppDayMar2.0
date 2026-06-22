import loginController from './../../controllers/auth/loginController.js';
import dotenv from 'dotenv';
dotenv.config();

const { LOGIN_SEG } = process.env;

const loginHandler = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { token, usuario } = await loginController(email, password);

		// Configuración de Cookie Segura para Web (React)
		res.cookie('token', token, {
			httpOnly: true, // No accesible por JavaScript (protege contra XSS)
			secure: LOGIN_SEG, // true en producción (HTTPS)
			sameSite: 'strict', // Protege contra ataques CSRF
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
			path: '/',
		});

		return res.status(200).json({
			loginApproved: true,
			usuario,
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default loginHandler;
