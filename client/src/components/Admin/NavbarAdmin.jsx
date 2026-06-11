import { Menu, LogOut, Bell } from 'lucide-react';

const NavbarAdmin = ({ isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
	return (
		<header className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
			<button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="text-gray-500 hover:text-vivero-dark transition">
				<Menu size={24} />
			</button>

			<div className="flex items-center space-x-4">
				<button className="text-gray-500 hover:text-vivero-gold transition">
					<Bell size={20} />
				</button>
				<button
					onClick={handleLogout}
					className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded transition">
					<LogOut size={20} />
					<span className="hidden md:inline font-semibold">Salir</span>
				</button>
			</div>
		</header>
	);
};

export default NavbarAdmin;
