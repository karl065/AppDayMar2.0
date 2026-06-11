// src/layouts/ClientLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/cliente/NavbarClient.jsx';
import Footer from './../components/ui/Footer.jsx';
import LoginModal from '../views/formularios/LoginForm.jsx';

const ClientLayout = () => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	// Aquí puedes manejar el estado de la cotización si es global

	return (
		<div className="flex flex-col min-h-screen bg-vivero-light">
			<Navbar onOpenLogin={() => setIsLoginModalOpen(true)} itemsCount={0} />

			<main className="grow">
				<Outlet />
			</main>

			<Footer />

			<LoginModal
				isOpen={isLoginModalOpen}
				onClose={() => setIsLoginModalOpen(false)}
			/>
		</div>
	);
};

export default ClientLayout;
