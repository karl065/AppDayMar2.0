import { NavLink } from 'react-router-dom';
import {
	LayoutDashboard,
	Package,
	ClipboardList,
	Settings,
	Users,
	X,
} from 'lucide-react';

const SidebarAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
	// Definimos las secciones del admin
	const menuItems = [
		{ name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
		{
			name: 'Productos',
			path: '/admin/productos',
			icon: <Package size={20} />,
		},
		{
			name: 'Pedidos/Cotizaciones',
			path: '/admin/pedidos',
			icon: <ClipboardList size={20} />,
		},
		{ name: 'Usuarios', path: '/admin/usuarios', icon: <Users size={20} /> },
		{
			name: 'Configuración',
			path: '/admin/configuracion',
			icon: <Settings size={20} />,
		},
	];

	return (
		<aside
			className={`fixed md:relative z-50 w-64 h-full bg-vivero-dark text-vivero-gold transition-transform duration-300 ease-in-out ${
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
			}`}>
			<div className="p-5 flex items-center justify-between border-b border-vivero-gold/30">
				<h2 className="font-serif text-xl font-bold uppercase tracking-widest">
					Daymar Admin
				</h2>
				<button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
					<X size={24} />
				</button>
			</div>

			<nav className="p-4 space-y-2">
				{menuItems.map((item) => (
					<NavLink
						key={item.name}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
								isActive
									? 'bg-vivero-gold text-vivero-dark font-bold'
									: 'hover:bg-vivero-accent hover:text-white'
							}`
						}>
						{item.icon}
						<span>{item.name}</span>
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

export default SidebarAdmin;
