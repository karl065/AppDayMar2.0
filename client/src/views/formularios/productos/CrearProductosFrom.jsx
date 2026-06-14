// src/views/paneles/admin/formularios/FormularioCrearProducto.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { crearProductosAction } from '../../../redux/productos/actions/crearProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';

const FormularioCrearProducto = ({ onClose }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			stock: '',
			categoria: '', // Asegúrate de tener este campo si tu modelo lo requiere
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			precio: Yup.number()
				.min(0, 'No puede ser negativo')
				.required('El precio es obligatorio'),
			stock: Yup.number()
				.integer()
				.min(0, 'No puede ser negativo')
				.required('El stock es obligatorio'),
		}),
		onSubmit: async (values) => {
			try {
				await crearProductosAction(dispatch, values);
				alertSuccess('Producto creado exitosamente');
				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al crear el producto');
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			{/* Nombre */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Nombre
				</label>
				<input
					name="nombre"
					type="text"
					value={formik.values.nombre}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
				/>
				{formik.touched.nombre && formik.errors.nombre && (
					<p className="text-red-500 text-xs">{formik.errors.nombre}</p>
				)}
			</div>

			{/* Precio y Stock */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Precio
					</label>
					<input
						name="precio"
						type="number"
						value={formik.values.precio}
						onChange={formik.handleChange}
						className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					/>
				</div>
				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Stock
					</label>
					<input
						name="stock"
						type="number"
						value={formik.values.stock}
						onChange={formik.handleChange}
						className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					/>
				</div>
			</div>

			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all">
				Registrar Producto
			</button>
		</form>
	);
};

export default FormularioCrearProducto;
