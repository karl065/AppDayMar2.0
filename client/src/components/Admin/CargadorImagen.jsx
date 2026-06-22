// src/components/admin/CargadorImagen.jsx
import { useEffect, useRef } from 'react';
import { alertError } from '../../helpers/alertas.jsx';
import getCloudinaryConfigService from './../../services/cloudinary/getCloudinaryConfigService.jsx';
import signCloudinaryWidgetService from './../../services/cloudinary/signCloudinaryWidgetService.jsx';

const CargadorImagen = ({ onUpload }) => {
	// 1. Creamos una referencia persistente para guardar la instancia del widget
	const widgetRef = useRef(null);

	useEffect(() => {
		// Inyectamos el script global de Cloudinary solo si no existe
		if (!document.getElementById('cloudinary-script')) {
			const script = document.createElement('script');
			script.id = 'cloudinary-script';
			script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	const openWidget = async () => {
		if (!window.cloudinary) {
			alertError(
				'El servicio de imágenes se está cargando. Intenta de nuevo en un segundo.',
			);
			return;
		}

		try {
			// 2. Patrón Singleton: Solo configuramos y creamos el widget si NO existe en la referencia
			if (!widgetRef.current) {
				// Obtenemos la configuración pública del backend
				const config = await getCloudinaryConfigService();

				// Guardamos la instancia en la referencia
				widgetRef.current = window.cloudinary.createUploadWidget(
					{
						cloudName: config.cloudName,
						apiKey: config.apiKey,
						uploadPreset: 'appDayMarOficial',
						multiple: false,

						// Firma dinámica para autorizar la subida
						uploadSignature: async (callback, params_to_sign) => {
							try {
								const signature =
									await signCloudinaryWidgetService(params_to_sign);
								callback(signature);
							} catch (err) {
								console.error('Error validando firma:', err);
								alertError('No se pudo validar la firma de seguridad.');
							}
						},
					},
					(error, result) => {
						if (!error && result && result.event === 'success') {
							onUpload(result.info.secure_url);
						}
					},
				);
			}

			// 3. Abrimos el widget reutilizando siempre la misma instancia
			widgetRef.current.open();
		} catch (error) {
			console.error('Error al iniciar el widget:', error);
			alertError('Error de conexión con el servidor de imágenes.');
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
