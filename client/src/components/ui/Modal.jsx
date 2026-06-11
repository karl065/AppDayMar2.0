import { X } from 'lucide-react';

const ModalBase = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
			<div className="bg-vivero-light w-full max-w-md rounded-xl shadow-2xl border border-vivero-gold/50">
				<div className="bg-vivero-dark px-6 py-4 flex justify-between items-center text-vivero-gold font-serif">
					<h3 className="text-xl font-bold">{title}</h3>
					<button onClick={onClose}>
						<X size={24} />
					</button>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default ModalBase;
