// src/components/admin/SidebarAdmin.jsx
import {
	LayoutDashboard,
	Package,
	Tag,
	Users,
	ShieldCheck,
	Layers,
	X,
} from 'lucide-react';

const SidebarAdmin = ({ isSidebarOpen, setIsSidebarOpen, setSeccion }) => {
	const menuItems = [
		{
			name: 'Tienda',
			key: 'tienda',
			icon: <LayoutDashboard size={20} />,
		},
		{ name: 'Productos', key: 'productos', icon: <Package size={20} /> },
		{ name: 'Categorías', key: 'categorias', icon: <Layers size={20} /> },
		{ name: 'Tipos', key: 'tipos', icon: <Tag size={20} /> },
		{ name: 'Usuarios', key: 'usuarios', icon: <Users size={20} /> },
		{ name: 'Roles', key: 'roles', icon: <ShieldCheck size={20} /> },
	];

	return (
		<aside
			className={`fixed md:relative z-50 w-64 h-full bg-vivero-dark text-vivero-gold transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
			<div className="p-5 flex items-center justify-between border-b border-vivero-gold/30">
				<h2 className="font-serif text-xl font-bold uppercase tracking-widest truncate mr-2">
					Daymar Admin
				</h2>
				<button
					type="button"
					onClick={() => setIsSidebarOpen(false)}
					className="p-1.5 bg-red-500/10 border border-vivero-gold/30 rounded-full hover:bg-red-500/20 shrink-0">
					<X size={20} strokeWidth={2.5} />
				</button>
			</div>

			<nav className="p-4 space-y-2">
				{menuItems.map((item) => (
					<button
						key={item.key}
						onClick={() => {
							setSeccion(item.key);
							setIsSidebarOpen(false);
						}}
						className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-vivero-gold hover:text-vivero-dark transition-all">
						{item.icon}
						<span>{item.name}</span>
					</button>
				))}
			</nav>
		</aside>
	);
};

export default SidebarAdmin;
