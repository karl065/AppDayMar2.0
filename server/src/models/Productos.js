import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const ProductosSchema = new mongoose.Schema({
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
		type: String,
		enum: ['Planta', 'Insumo'],
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	categoria: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categorias',
		required: true,
	},
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuarios',
		required: true,
	},
});

const ProductosModel = connection.model('Productos', ProductosSchema);

export default ProductosModel;
