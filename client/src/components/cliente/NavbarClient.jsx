// src/components/cliente/NavbarClient.jsx
import { LogOut, User, ShoppingCart, Menu } from 'lucide-react';

const NavbarClient = ({
	onOpenLogin,
	onOpenRegister,
	handleLogout,
	user,
	itemsCount,
}) => {
	const isLoggedIn = !!user && Object.keys(user).length > 0;

	return (
		<nav className="h-16 sm:h-20 bg-vivero-dark text-vivero-gold shadow-md border-b border-vivero-gold/40 flex items-center px-4 md:px-10 z-50 relative">
			{/* LADO IZQUIERDO: Botón Menú y Registro */}
			<div className="flex-1 flex justify-start items-center gap-4">
				<button className="md:hidden p-2 rounded-full hover:bg-vivero-gold/10">
					<Menu size={24} />
				</button>
				{!isLoggedIn && (
					<button
						onClick={onOpenRegister}
						className="text-sm font-bold bg-vivero-gold text-vivero-dark px-4 py-2 rounded-full hover:scale-105 transition-all hidden md:block">
						Registrar
					</button>
				)}
			</div>

			{/* CENTRO: Logo y Título */}
			<div className="flex items-center justify-center gap-3">
				<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
					<img
						src="https://res.cloudinary.com/dpjeltekx/image/upload/v1781398170/appDayMar/app/ChatGPT_Image_13_jun_2026_07_47_48_p.m_kastgo.png"
						alt="Logo Vivero Daymar"
						className="w-full h-full object-contain drop-shadow-md"
					/>
				</div>
				<div className="text-xl font-serif font-bold tracking-widest uppercase hidden sm:block">
					Daymar
				</div>
			</div>

			{/* LADO DERECHO: Carrito, Entrar o Perfil/Logout */}
			<div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
				<button className="relative p-2 hover:text-white transition-colors">
					<ShoppingCart size={22} />
					{itemsCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-vivero-gold text-vivero-dark text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
							{itemsCount}
						</span>
					)}
				</button>

				{isLoggedIn ? (
					<div className="flex items-center gap-3 border-l border-vivero-gold/30 pl-4">
						<div className="flex items-center gap-2">
							<User size={18} className="text-vivero-gold" />
							<span className="text-sm font-semibold hidden sm:block">
								{user.nombre}
							</span>
						</div>
						<button
							onClick={handleLogout}
							className="text-red-400 hover:text-red-300 transition-colors"
							title="Cerrar sesión">
							<LogOut size={20} />
						</button>
					</div>
				) : (
					<button
						onClick={onOpenLogin}
						className="text-sm font-bold hover:text-white transition-colors">
						Entrar
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavbarClient;
