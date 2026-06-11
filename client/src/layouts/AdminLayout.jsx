// src/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../components/admin/SidebarAdmin.jsx';
import NavbarAdmin from '../components/admin/NavbarAdmin.jsx';
import { alertConfirm } from '../helpers/alertas.jsx';
import { logoutAction } from '../redux/admin/actions/logoutAction.jsx';

const AdminLayout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { login } = useSelector((state) => state.login);
	const userId = login?.usuario?._id || login?._id;

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
		<div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
			<SidebarAdmin
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				<NavbarAdmin
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
					handleLogout={handleLogout}
				/>

				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
					<div className="max-w-7xl mx-auto p-4 md:p-8">
						<Outlet />
					</div>
				</main>
			</div>

			{isSidebarOpen && (
				<div
					onClick={() => setIsSidebarOpen(false)}
					className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
				/>
			)}
		</div>
	);
};

export default AdminLayout;
