// src/components/cliente/Navbar.jsx

import { User, ClipboardList } from 'lucide-react';

const Navbar = ({ onOpenCart, itemsCount, onOpenLogin }) => {
	return (
		<nav className="flex h-16 sm:h-20 items-center bg-linear-to-r from-vivero-dark via-vivero-dark to-vivero-accent text-vivero-gold shadow-md border-b border-vivero-gold/40 relative z-50">
			{/* El contenedor ahora es 'relative' para que el centro absoluto se guíe por él */}
			<div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative">
				{/* 1. LADO IZQUIERDO: Vacío por ahora, pero mantiene la estructura */}
				<div className="flex-1"></div>

				{/* 2. CENTRO EXACTO: Posición absoluta para forzar el centro perfecto */}
				<div className="absolute left-1/2 -translate-x-1/2 flex gap-6 sm:gap-8  items-center cursor-pointer group w-max">
					{/* Rombo del logo */}
					<div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center drop-shadow-[0_0_8px_rgba(197,168,89,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(197,168,89,0.7)] transition-all duration-500 shrink-0s">
						<img
							src={
								'https://res.cloudinary.com/dpjeltekx/image/upload/v1781398170/appDayMar/app/ChatGPT_Image_13_jun_2026_07_47_48_p.m_kastgo.png'
							}
							alt="Logo Vivero Daymar"
							className="w-full h-full object-contain"
						/>
					</div>
					{/* Título: Usamos ml-6 (margen izquierdo) en lugar de gap para alejarlo bien de la punta del rombo */}
					<div className="ml-6 text-xl md:text-2xl font-serif font-bold tracking-widest uppercase drop-shadow-sm group-hover:text-pastel-cream transition-colors duration-300">
						<h1>Vivero Daymar</h1>
					</div>
				</div>

				{/* 3. LADO DERECHO: Controles. Relative z-10 para asegurar que queden por encima del centro si la pantalla es muy pequeña */}
				<div className="flex flex-1 items-center justify-end gap-6 md:gap-8 relative z-10">
					{/* Botón de Cotización */}
					<button
						onClick={onOpenCart}
						className="relative p-2 rounded-full hover:bg-vivero-gold/10 hover:text-pastel-cream transition-all duration-300"
						aria-label="Ver mi pedido">
						<ClipboardList size={26} />
						{itemsCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-vivero-dark animate-pulse">
								{itemsCount}
							</span>
						)}
					</button>

					{/* Separador sutil */}
					<div className="hidden sm:block w-px h-7 bg-vivero-gold/30"></div>

					{/* Botón de Acceso (Admin) */}
					<button
						onClick={onOpenLogin}
						className="p-2 rounded-full hover:bg-vivero-gold/10 hover:text-pastel-cream transition-all duration-300"
						aria-label="Acceso administrativo">
						<User size={24} />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
