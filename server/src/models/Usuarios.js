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
	departamento: { type: String, trim: true },
	ciudad: { type: String, trim: true },
	direccion: { type: String, trim: true },
	rol: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Roles',
	},
	cotizaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cotizaciones' }],
	status: {
		type: Boolean,
		default: false,
	},
});

const Usuarios = connection.model('Usuarios', UsuarioSchema);

export default Usuarios;
