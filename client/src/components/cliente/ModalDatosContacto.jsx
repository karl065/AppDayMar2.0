import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalBase from '../ui/Modal.jsx';
import SelectorUbicacion from '../../helpers/SelectorUbicacion.jsx';

const ModalDatosContacto = ({ isOpen, onClose, cotizacion }) => {
	const { login } = useSelector((state) => state.login);
	const [datos, setDatos] = useState({
		nombre: login?.nombre + ' ' + login?.apellido || '',
		celular: login?.celular || '',
		direccion: login?.direccion || '',
		departamento: login?.departamento || '',
		ciudad: login?.ciudad || '',
	});

	const enviarWhatsApp = () => {
		// Generación de emojis en la memoria del navegador usando códigos Hexadecimales.
		// Esto evita el 100% de los errores de codificación del archivo y del empaquetador.
		const ePlanta = String.fromCodePoint(0x1f33f); // 🌿
		const eUsuario = String.fromCodePoint(0x1f464); // 👤
		const eCelular = String.fromCodePoint(0x1f4f1); // 📱
		const ePin = String.fromCodePoint(0x1f4cd); // 📍
		const eMundo = String.fromCodePoint(0x1f30e); // 🌎
		const eLista = String.fromCodePoint(0x1f4cb); // 📋

		const lista = cotizacion
			.map((i) => `• ${i.producto.nombre} (x${i.cantidad})`)
			.join('\n');

		// Construimos el mensaje con los emojis generados en tiempo de ejecución
		const mensaje =
			`${ePlanta} *Nueva Cotización Vivero Daymar* ${ePlanta}\n\n` +
			`${eUsuario} Cliente: ${datos.nombre}\n` +
			`${eCelular} Celular: ${datos.celular}\n` +
			`${ePin} Dirección: ${datos.direccion}\n` +
			`${eMundo} Ubicación: ${datos.departamento}, ${datos.ciudad}\n\n` +
			`${eLista} *Productos:*\n${lista}`;

		// Al usar encodeURIComponent ahora, recibirá el texto puro y codificará los
		// emojis correctamente a su equivalente en URL (ej. %F0%9F%8C%BF) sin corromperlos.
		const url = `https://api.whatsapp.com/send?phone=573213509063&text=${encodeURIComponent(mensaje)}`;

		// Si tu bloqueador de ventanas emergentes interfiere con window.open,
		// el usuario igual recibirá una alerta para desactivarlo temporalmente.
		const ventana = window.open(url, '_blank');
		if (!ventana) {
			alert('Por favor, permite las ventanas emergentes para continuar.');
		}

		onClose();
	};

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title="Datos de Contacto">
			<div className="space-y-3 p-4">
				<input
					placeholder="Nombre Completo"
					defaultValue={datos.nombre}
					className="w-full p-3 border rounded-lg"
					onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
				/>
				<input
					placeholder="Celular"
					type="number"
					defaultValue={datos.celular}
					className="w-full p-3 border rounded-lg"
					onChange={(e) => setDatos({ ...datos, celular: e.target.value })}
				/>

				{/* Integración del Helper */}
				<div className="border p-3 rounded-lg bg-gray-50">
					<SelectorUbicacion
						initialData={{
							departamento: datos.departamento,
							ciudad: datos.ciudad,
						}}
						onChange={(u) => {
							setDatos({
								...datos,
								departamento: u.departamento,
								ciudad: u.ciudad,
							});
						}}
					/>
				</div>

				<input
					placeholder="Dirección exacta"
					defaultValue={datos.direccion}
					className="w-full p-3 border rounded-lg"
					onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
				/>

				<button
					onClick={enviarWhatsApp}
					className="w-full bg-vivero-gold text-vivero-dark py-3 rounded-full font-bold hover:bg-vivero-accent transition-all">
					Enviar a WhatsApp 🌿
				</button>
			</div>
		</ModalBase>
	);
};

export default ModalDatosContacto;
