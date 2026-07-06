import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const SubCategoriasSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	categoria: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categorias',
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

const SubCategorias = connection.model('SubCategorias', SubCategoriasSchema);

export default SubCategorias;
