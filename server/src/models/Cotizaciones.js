import mongoose from 'mongoose';
import connection from '../config/DBConnection.js';

const CotizacionSchema = new mongoose.Schema({
	usuario: {
		type: mongoose.Schema.Types.ObjectId, // Ahora sí reconocerá Schema
		ref: 'Usuarios',
		default: null,
	},
	cliente: {
		nombre: { type: String },
		celular: { type: String },
		direccion: { type: String },
		departamento: { type: String },
		ciudad: { type: String },
	},
	productos: [
		{
			producto: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Productos',
				required: true,
			},
			cantidad: { type: Number, required: true, min: 1 },
			precioUnitario: { type: Number, default: 0 },
			// 🔥 NUEVO: Estado de disponibilidad por producto
			disponibilidad: {
				type: String,
				enum: ['pendiente', 'disponible', 'no_disponible'],
				default: 'pendiente',
			},
		},
	],
	total: { type: Number, default: 0 },
	estado: {
		type: String,
		enum: ['pendiente', 'aprobada', 'rechazada', 'respondida'],
		default: 'pendiente',
	},
	notasAdmin: { type: String },
	createdAt: { type: Date, default: Date.now },
});

const Cotizaciones = connection.model('Cotizacion', CotizacionSchema);

export default Cotizaciones;
