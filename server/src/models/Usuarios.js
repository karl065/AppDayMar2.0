import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const UsuarioSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	apellido: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	celular: {
		type: Number,
		required: true,
		trim: true,
	},
	rol: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Roles',
	},
});

const UsuariosModel = connection.model('Usuarios', UsuarioSchema);

export default UsuariosModel;
