import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const RolesSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	descripcion: {
		type: String,
		required: true,
		trim: true,
	},
	usuarios: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuarios',
		},
	],
});

const RolesModel = connection.model('Roles', RolesSchema);

export default RolesModel;
