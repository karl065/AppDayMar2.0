// src/layouts/ClientLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/cliente/NavbarClient.jsx';
import Footer from './../components/ui/Footer.jsx';
import LoginModal from '../views/formularios/LoginForm.jsx';
import RegisterModal from '../views/formularios/clientes/RegisterModal.jsx';
import { logoutAction } from '../redux/admin/actions/logoutAction.jsx';
import { alertConfirm } from '../helpers/alertas.jsx';

const ClientLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Obtenemos el usuario del estado para saber si está logueado
	const { login } = useSelector((state) => state.login);
	console.log(login);
	const userId = login?.usuario?._id || login?._id;

	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	const handleLogout = async () => {
		const confirmar = await alertConfirm(
			'Cerrar Sesión',
			'¿Estás seguro de que deseas salir?',
		);
		if (confirmar) {
			// Usamos tu misma lógica de logoutAction
			await logoutAction(userId, { userStatus: false }, dispatch, navigate);
		}
	};

	return (
		<div className="flex flex-col h-screen bg-vivero-light overflow-hidden">
			<Navbar
				onOpenLogin={() => setIsLoginModalOpen(true)}
				onOpenRegister={() => setIsRegisterModalOpen(true)}
				handleLogout={handleLogout} // 🔥 Inyectamos el logout aquí
				user={login?.usuario || login} // 🔥 Pasamos el usuario para que el Navbar muestre el nombre
				itemsCount={0}
			/>

			<main className="flex-1 overflow-y-auto min-h-0">
				{/* Pasamos el estado de sesión por context si algún hijo lo necesita */}
				<Outlet context={{ user: login?.usuario || login }} />
			</main>

			<Footer />

			<LoginModal
				isOpen={isLoginModalOpen}
				onClose={() => setIsLoginModalOpen(false)}
			/>

			<RegisterModal
				isOpen={isRegisterModalOpen}
				onClose={() => setIsRegisterModalOpen(false)}
				onSwitchToLogin={() => {
					setIsRegisterModalOpen(false);
					setIsLoginModalOpen(true);
				}}
			/>
		</div>
	);
};

export default ClientLayout;
