// src/views/paneles/admin/formularios/FormularioCrearProducto.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { crearProductosAction } from '../../../redux/productos/actions/crearProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import CargadorImagen from './../../../components/Admin/CargadorImagen';

const FormularioCrearProducto = ({ onClose }) => {
	const dispatch = useDispatch();
	const { categorias } = useSelector((state) => state.categorias);
	const { login } = useSelector((state) => state.login);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			stock: '',
			categoria: '',
			descripcion: '',
			imagen: '',
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
			categoria: Yup.string().required('Debes seleccionar una categoría'),
			descripcion: Yup.string().required('La descripción es obligatoria'),
			imagen: Yup.string().required('Debes subir una imagen'),
		}),
		onSubmit: async (values) => {
			try {
				// Añadimos el usuario que crea el producto
				const dataFinal = {
					...values,
					usuario: login?.usuario?._id || login?._id,
				};
				await crearProductosAction(dispatch, dataFinal);
				alertSuccess('Producto registrado exitosamente');
				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al crear el producto');
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			{/* Nombre e Imagen */}
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
			</div>

			<div className="flex flex-col gap-2">
				<label className="block text-sm font-bold text-vivero-dark">
					Imagen del Producto
				</label>
				<CargadorImagen
					onUpload={(url) => formik.setFieldValue('imagen', url)}
				/>
				{formik.values.imagen && (
					<img
						src={formik.values.imagen}
						alt="Preview"
						className="w-20 h-20 object-cover rounded border border-vivero-gold"
					/>
				)}
			</div>

			{/* Categoría */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Categoría
				</label>
				<select
					name="categoria"
					value={formik.values.categoria}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white">
					<option value="">-- Seleccione una categoría --</option>
					{categorias.map((c) => (
						<option key={c._id} value={c._id}>
							{c.nombre}
						</option>
					))}
				</select>
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

			{/* Descripción */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Descripción
				</label>
				<textarea
					name="descripcion"
					value={formik.values.descripcion}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					rows="2"
				/>
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
