import { v2 as cloudinary } from 'cloudinary';

import './../../utils/Cloudinary/config.js';

import signUploadWidget from './../../utils/Cloudinary/signUploadWidget.js';
import deleteImagen from './../../utils/Cloudinary/DeleteImagen.js';

const handlerCloudinaryWidget = (req, res, next) => {
	try {
		const sig = signUploadWidget();
		return res.status(200).json({
			signature: sig.signature,
			timestamp: sig.timestamp,
			cloudName: cloudinary.config().cloud_name,
			apiKey: cloudinary.config().api_key,
		});
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

const handlerDeleteImagen = async (req, res) => {
	try {
		const { publicId } = req.body;
		const response = await deleteImagen(publicId);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

export default { handlerCloudinaryWidget, handlerDeleteImagen };
