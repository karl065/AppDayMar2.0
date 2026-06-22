// src/views/formularios/RegisterForm.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearUsuariosAction } from '../../../redux/admin/actions/crearUsuariosAction.jsx';
import { alertError } from '../../../helpers/alertas.jsx';
import ModalBase from '../../../components/ui/Modal.jsx';
import SelectorUbicacion from '../../../helpers/SelectorUbicacion.jsx';
import { EyeIcon } from '../../../components/Icons/Icons.jsx';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
	const dispatch = useDispatch();
	const { roles } = useSelector((state) => state.roles);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			email: '',
			celular: '',
			password: '',
			confirmPassword: '',
			departamento: '',
			ciudad: '',
			direccion: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('Obligatorio'),
			apellido: Yup.string().required('Obligatorio'),
			email: Yup.string().email('Email inválido').required('Obligatorio'),
			celular: Yup.string().required('Obligatorio'),
			password: Yup.string()
				.min(6, 'Mínimo 6 caracteres')
				.required('Obligatorio'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
				.required('Confirma tu contraseña'),
			departamento: Yup.string().required('Seleccione departamento'),
			ciudad: Yup.string().required('Seleccione ciudad'),
			direccion: Yup.string().required('Obligatorio'),
		}),
		onSubmit: async (values) => {
			try {
				const rolCliente = roles.find(
					(r) => r.nombre.toLowerCase() === 'cliente',
				);

				if (!rolCliente) {
					throw new Error('No se encontró el rol de cliente en el sistema.');
				}

				// Hacemos una copia para no mutar el original de Formik
				const dataToSubmit = { ...values, rol: rolCliente._id };

				// Usamos delete como tienes implementado en tus otros formularios
				delete dataToSubmit.confirmPassword;

				console.log('Registrando cliente:', dataToSubmit);
				await crearUsuariosAction(dispatch, dataToSubmit);
				onClose();
			} catch (error) {
				alertError(error.message);
			}
		},
	});

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title="Crear Cuenta">
			<form
				onSubmit={formik.handleSubmit}
				className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
				<div className="grid grid-cols-2 gap-2">
					<input
						name="nombre"
						placeholder="Nombre"
						onChange={formik.handleChange}
						value={formik.values.nombre}
						className="p-3 border rounded-lg"
					/>
					<input
						name="apellido"
						placeholder="Apellido"
						onChange={formik.handleChange}
						value={formik.values.apellido}
						className="p-3 border rounded-lg"
					/>
				</div>

				<input
					name="email"
					type="email"
					placeholder="Correo Electrónico"
					onChange={formik.handleChange}
					value={formik.values.email}
					className="w-full p-3 border rounded-lg"
				/>
				<input
					name="celular"
					placeholder="Celular"
					onChange={formik.handleChange}
					value={formik.values.celular}
					className="w-full p-3 border rounded-lg"
				/>

				<div className="border p-3 rounded-lg bg-gray-50">
					<SelectorUbicacion
						onChange={(u) => {
							formik.setFieldValue('departamento', u.departamento);
							formik.setFieldValue('ciudad', u.ciudad);
						}}
					/>
					<input
						name="direccion"
						placeholder="Dirección exacta"
						onChange={formik.handleChange}
						value={formik.values.direccion}
						className="w-full p-2 border rounded mt-2"
					/>
				</div>

				<div className="relative">
					<input
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Contraseña"
						onChange={formik.handleChange}
						value={formik.values.password}
						className="w-full p-3 border rounded-lg pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-3.5 text-gray-500">
						<EyeIcon />
					</button>
				</div>

				<div className="relative">
					<input
						name="confirmPassword"
						type={showConfirmPassword ? 'text' : 'password'}
						placeholder="Confirmar Contraseña"
						onChange={formik.handleChange}
						value={formik.values.confirmPassword}
						className="w-full p-3 border rounded-lg pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute right-3 top-3.5 text-gray-500">
						<EyeIcon />
					</button>
				</div>

				<button
					type="submit"
					className="w-full bg-vivero-gold text-vivero-dark py-3 rounded-full font-bold hover:bg-vivero-accent transition-colors">
					Registrarme
				</button>

				<div className="text-center text-sm border-t pt-4">
					<button
						type="button"
						onClick={onSwitchToLogin}
						className="text-vivero-gold font-bold hover:underline">
						¿Ya tienes cuenta? Inicia Sesión
					</button>
				</div>
			</form>
		</ModalBase>
	);
};

export default RegisterModal;
