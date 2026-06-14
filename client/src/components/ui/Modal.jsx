import { X } from 'lucide-react';

const ModalBase = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
			<div className="bg-vivero-light w-full max-w-md rounded-xl shadow-2xl border border-vivero-gold/50 overflow-hidden">
				{/* 1. Hacemos el contenedor 'relative' y lo alineamos a la derecha ('justify-end') 
                    para que el botón se quede en su sitio.
                */}
				<div className="bg-vivero-dark relative px-6 py-4 flex justify-end items-center text-vivero-gold font-serif">
					{/* 2. Centramos el título de forma absoluta, igual que en el Navbar */}
					<h3 className="absolute left-1/2 uppercase -translate-x-1/2 text-xl font-bold m-0 text-center w-max">
						{title}
					</h3>

					<button
						onClick={onClose}
						className="hover:text-vivero-light transition-colors relative z-10">
						<X size={24} />
					</button>
				</div>

				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default ModalBase;
