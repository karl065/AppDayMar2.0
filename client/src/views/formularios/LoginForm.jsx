// src/views/formularios/LoginForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { loginAction } from '../../redux/admin/actions/loginAction.jsx';
import ModalBase from '../../components/ui/Modal.jsx';
import { EyeIcon } from './../../components/Icons/Icons.jsx';
// Asegúrate de poner la ruta correcta a tu archivo de iconos

const LoginModal = ({ isOpen, onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// 1. Estado para controlar la visibilidad de la contraseña
	const [showPassword, setShowPassword] = useState(false);

	// Configuración de Formik
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values, { resetForm }) => {
			const success = await loginAction(values, dispatch, navigate);
			if (success) {
				resetForm(); // Limpiamos el formulario al salir
				onClose();
			}
		},
	});

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title="Iniciar Sesión">
			<form onSubmit={formik.handleSubmit} className="space-y-5">
				<div>
					<label className="block text-sm font-semibold text-vivero-dark mb-1">
						Correo Electrónico
					</label>
					<input
						type="email"
						name="email"
						placeholder="ejemplo@viverodaymar.com"
						onChange={formik.handleChange}
						value={formik.values.email}
						className="w-full px-4 py-2 border border-vivero-gold/50 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-vivero-gold/80 transition-shadow"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-vivero-dark mb-1">
						Contraseña
					</label>
					{/* 2. El contenedor se vuelve 'relative' para poder posicionar el icono encima */}
					<div className="relative">
						<input
							// 3. El tipo cambia según el estado
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="••••••••"
							onChange={formik.handleChange}
							value={formik.values.password}
							// Se le agrega pr-10 para que el texto no se monte debajo del icono
							className="w-full pl-4 pr-10 py-2 border border-vivero-gold/50 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-vivero-gold/80 transition-shadow"
							required
						/>
						{/* 4. El botón posicionado absolutamente a la derecha */}
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-gray-500 hover:text-vivero-dark transition-colors"
							aria-label={
								showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
							}>
							{/* Le pasamos un tamaño o clase base a tu icono si lo soporta, o lo renderiza por defecto */}
							<EyeIcon className="text-xl" />
						</button>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-vivero-dark text-vivero-gold py-3 rounded-xl uppercase font-bold tracking-wider hover:bg-vivero-accent transition-colors mt-2">
					Ingresar
				</button>
			</form>
		</ModalBase>
	);
};

export default LoginModal;
