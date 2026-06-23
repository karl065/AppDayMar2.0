// src/components/cliente/NavbarClient.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LogOut, User } from 'lucide-react';
import { actualizarUsuariosAction } from './../../redux/admin/actions/actualizarUsuariosAction.jsx';
import { alertError, alertSuccess } from '../../helpers/alertas.jsx';
import ModalBase from '../ui/Modal.jsx';
import FormPerfilUsuario from '../../views/paneles/client/FormPerfilUsuario.jsx';

const NavbarClient = ({ onOpenLogin, onOpenRegister, handleLogout, user }) => {
	const dispatch = useDispatch();
	const isLoggedIn = !!user && Object.keys(user).length > 0;

	// 🔥 Estado interno para controlar el modal del perfil
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	// 🔥 Función para procesar la actualización
	const handleUpdateProfile = async (values) => {
		try {
			await actualizarUsuariosAction(dispatch, user._id, values);
			alertSuccess('Perfil actualizado correctamente');
			setIsProfileOpen(false);
		} catch (error) {
			console.log(error);
			alertError('Hubo un error al actualizar tus datos');
		}
	};

	return (
		<>
			<nav className="h-16 sm:h-20 bg-vivero-dark text-vivero-gold shadow-md border-b border-vivero-gold/40 flex items-center px-4 md:px-10 z-40 relative">
				{/* LADO IZQUIERDO: Botón Registro */}
				<div className="flex-1 flex justify-start items-center">
					{!isLoggedIn && (
						<button
							onClick={onOpenRegister}
							className="text-xs sm:text-sm font-bold bg-vivero-gold text-vivero-dark px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:scale-105 transition-all">
							Registrar
						</button>
					)}
				</div>

				{/* CENTRO: Logo y Título */}
				<div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
					<div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
						<img
							src="https://res.cloudinary.com/dpjeltekx/image/upload/v1781398170/appDayMar/app/ChatGPT_Image_13_jun_2026_07_47_48_p.m_kastgo.png"
							alt="Logo Vivero Daymar"
							className="w-full h-full object-contain drop-shadow-md"
						/>
					</div>
					<div className="text-lg sm:text-xl font-serif font-bold tracking-widest uppercase">
						Daymar
					</div>
				</div>

				{/* LADO DERECHO: Perfil/Login */}
				<div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
					{isLoggedIn ? (
						<div className="flex items-center gap-2 pl-3">
							{/* 🔥 Botón que abre el modal */}
							<button
								onClick={() => setIsProfileOpen(true)}
								className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
								title="Actualizar mi perfil">
								<User size={18} className="text-vivero-gold" />
								<span className="text-xs sm:text-sm font-semibold truncate max-w-15 sm:max-w-none">
									{user.nombre}
								</span>
							</button>

							<div className="h-6 w-px bg-vivero-gold/30 mx-1"></div>

							<button
								onClick={handleLogout}
								className="text-red-400 hover:text-red-300 transition-colors p-2"
								title="Cerrar sesión">
								<LogOut size={18} />
							</button>
						</div>
					) : (
						<button
							onClick={onOpenLogin}
							className="text-xs sm:text-sm font-bold hover:text-white transition-colors">
							Entrar
						</button>
					)}
				</div>
			</nav>

			{/* 🔥 ModalBase llamado y configurado */}
			<ModalBase
				isOpen={isProfileOpen}
				onClose={() => setIsProfileOpen(false)}
				title="Mi Perfil">
				<FormPerfilUsuario
					usuario={user}
					onSubmit={handleUpdateProfile}
					onClose={() => setIsProfileOpen(false)}
				/>
			</ModalBase>
		</>
	);
};

export default NavbarClient;
