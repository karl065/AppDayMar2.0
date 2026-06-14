import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const TiposSchema = new mongoose.Schema({
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
	categorias: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Categorias',
		},
	],
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuarios',
	},
});

const TiposModel = connection.model('Tipos', TiposSchema);

export default TiposModel;
