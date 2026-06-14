// src/components/admin/NavbarAdmin.jsx
import { Menu, LogOut, Plus } from 'lucide-react';

const NavbarAdmin = ({
	isSidebarOpen,
	setIsSidebarOpen,
	handleLogout,
	seccion,
	onOpenCreate,
}) => {
	// Capitalizamos la primera letra de la sección actual
	const tituloSeccion = seccion.charAt(0).toUpperCase() + seccion.slice(1);

	return (
		<nav className="h-16 sm:h-20 bg-linear-to-r from-vivero-dark via-vivero-dark to-vivero-accent text-vivero-gold shadow-md border-b border-vivero-gold/40 flex items-center px-4 md:px-10 relative z-40">
			<div className="w-full flex items-center justify-between">
				{/* 1. LADO IZQUIERDO: Botón Menú */}
				<div className="flex-1">
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="p-2 rounded-full hover:bg-vivero-gold/10 hover:text-pastel-cream transition-all duration-300">
						<Menu size={28} />
					</button>
				</div>

				{/* 2. CENTRO: Logo y Título (Restaurado) */}
				<div className="absolute left-1/2 -translate-x-1/2 flex items-center cursor-pointer pointer-events-none">
					<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
						<img
							src="https://res.cloudinary.com/dpjeltekx/image/upload/v1781398170/appDayMar/app/ChatGPT_Image_13_jun_2026_07_47_48_p.m_kastgo.png"
							alt="Logo Vivero Daymar"
							className="w-full h-full object-contain drop-shadow-md"
						/>
					</div>
					{/* Título de la sección al lado del logo */}
					<h1 className="ml-4 text-lg md:text-xl font-serif font-bold tracking-widest uppercase sm:block">
						{tituloSeccion}
					</h1>
				</div>

				{/* 3. LADO DERECHO: Acciones */}
				<div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
					{/* BOTÓN CREAR DINÁMICO */}
					{seccion !== 'dashboard' && (
						<button
							onClick={onOpenCreate}
							className="flex items-center gap-2 px-3 py-1.5 md:px-4 bg-vivero-gold text-vivero-dark rounded-full font-bold hover:scale-105 transition-all">
							<Plus size={20} />
							<span className="hidden sm:inline">Crear</span>
						</button>
					)}

					<button
						onClick={handleLogout}
						className="text-red-400 hover:text-red-300 transition-all">
						<LogOut size={22} />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default NavbarAdmin;
