// src/utils/Cloudinary/getCloudinaryConfig.js

import cloudinaryConfig from './config.js';

const getCloudinaryConfig = () => {
	// Ahora podemos leer directamente del objeto que exportó tu config.js
	return {
		cloudName: cloudinaryConfig.cloud_name,
		apiKey: cloudinaryConfig.api_key,
	};
};

export default getCloudinaryConfig;
