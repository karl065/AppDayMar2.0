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
	precio: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	estado: {
		type: String,
		enum: ['disponible', 'agotado', 'descontinuado'],
		default: 'disponible',
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

const Productos = connection.model('Productos', ProductosSchema);

export default Productos;
