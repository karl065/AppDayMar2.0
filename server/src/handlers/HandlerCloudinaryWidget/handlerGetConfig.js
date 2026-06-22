import getCloudinaryConfig from '../../utils/Cloudinary/getCloudinaryConfig.js';

// Endpoint GET: Entrega configuración al iniciar el widget
const handlerGetConfig = (req, res) => {
	try {
		const config = getCloudinaryConfig();

		return res.status(200).json(config);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default handlerGetConfig;
