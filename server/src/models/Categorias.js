import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const CategoriasSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	imagen: {
		type: String,
		required: true,
	},
	tipo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tipos',
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	productos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Productos',
		},
	],
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuarios',
		required: true,
	},
});

const Categorias = connection.model('Categorias', CategoriasSchema);

export default Categorias;
