// src/components/admin/CargadorImagen.jsx
import { useEffect } from 'react';
import cloudinaryServices from '../../services/cloudinary/cloudinaryService';
import { alertError } from '../../helpers/alertas';

const CargadorImagen = ({ onUpload }) => {
	useEffect(() => {
		// Solo inyectamos el script si no existe
		if (!document.getElementById('cloudinary-script')) {
			const script = document.createElement('script');
			script.id = 'cloudinary-script';
			script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	const openWidget = async () => {
		// Validamos que el script haya cargado
		if (!window.cloudinary) {
			alertError(
				'El cargador de imágenes aún no está listo. Intenta de nuevo.',
			);
			return;
		}

		try {
			// 1. Obtener firma del backend
			const data = await cloudinaryServices();

			const widget = window.cloudinary.createUploadWidget(
				{
					cloudName: data.cloudName,
					uploadPreset: 'appDayMarOficial',
					apiKey: data.apiKey,
					signature: data.signature,
					timestamp: data.timestamp,
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						onUpload(result.info.secure_url);
					}
				},
			);
			widget.open();
		} catch (error) {
			console.error('Error al iniciar Cloudinary Widget:', error);
			alertError('No se pudo conectar con el servicio de imágenes');
		}
	};

	return (
		<button
			type="button"
			onClick={openWidget}
			className="w-full bg-vivero-gold/20 p-2 border border-vivero-gold rounded hover:bg-vivero-gold/40 transition-all font-bold">
			Seleccionar Imagen
		</button>
	);
};

export default CargadorImagen;
