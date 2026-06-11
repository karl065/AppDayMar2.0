// src/components/cliente/Navbar.jsx

import { User, ClipboardList } from 'lucide-react';

const Navbar = ({ onOpenCart, itemsCount, onOpenLogin }) => {
	return (
		<nav className="bg-vivero-dark text-vivero-gold shadow-lg border-b border-vivero-gold/30">
			<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
				<div className="flex items-center space-x-3 cursor-pointer">
					<div className="w-8 h-8 bg-vivero-light rotate-45 border-2 border-vivero-gold flex items-center justify-center"></div>
					<h1 className="text-xl font-serif font-bold tracking-widest uppercase">
						Vivero Daymar
					</h1>
				</div>

				<div className="flex items-center space-x-6">
					<button
						onClick={onOpenCart}
						className="relative p-2 hover:text-vivero-light transition">
						<ClipboardList size={24} />
						{itemsCount > 0 && (
							<span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
								{itemsCount}
							</span>
						)}
					</button>
					<button
						onClick={onOpenLogin}
						className="hover:bg-vivero-gold/10 p-2 rounded-full transition">
						<User size={20} />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
