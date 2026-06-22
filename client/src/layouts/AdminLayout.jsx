// src/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertConfirm } from './../helpers/alertas.jsx';
import { logoutAction } from './../redux/admin/actions/logoutAction.jsx';
import SidebarAdmin from './../components/Admin/SidebarAdmin.jsx';
import NavbarAdmin from './../components/Admin/NavbarAdmin.jsx';

const AdminLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { login } = useSelector((state) => state.login);
	const userId = login?.usuario?._id || login?._id;

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 1. Estados centrales de navegación y modales
	const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
	const [seccion, setSeccion] = useState('dashboard');

	const handleLogout = async () => {
		const confirmar = await alertConfirm(
			'Cerrar Sesión',
			'¿Estás seguro de que deseas salir del panel administrativo?',
		);
		if (confirmar) {
			await logoutAction(userId, { userStatus: false }, dispatch, navigate);
		}
	};

	return (
		<div className="flex h-screen bg-vivero-light overflow-hidden font-sans">
			<SidebarAdmin
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				setSeccion={setSeccion}
			/>

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				<NavbarAdmin
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
					handleLogout={handleLogout}
					seccion={seccion}
					onOpenCreate={() => setModalCrearAbierto(true)}
				/>

				<main className="flex-1 overflow-x-hidden overflow-y-auto">
					<div className="max-w-7xl mx-auto p-4 md:p-8">
						{/* CORRECCIÓN: Aquí pasamos todo el estado necesario al Outlet 
                            para que PanelAdministrativo pueda manejar el modal.
                        */}
						<Outlet
							context={{
								seccion,
								setSeccion,
								modalCrearAbierto,
								setModalCrearAbierto,
							}}
						/>
					</div>
				</main>
			</div>

			{isSidebarOpen && (
				<div
					onClick={() => setIsSidebarOpen(false)}
					className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
				/>
			)}
		</div>
	);
};

export default AdminLayout;
