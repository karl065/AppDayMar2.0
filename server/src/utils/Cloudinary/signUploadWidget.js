// src/utils/Cloudinary/signUploadWidget.js
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from './config.js';

const signUploadWidget = (paramsToSign) => {
	// Leemos el secret del objeto exportado
	const apiSecret = cloudinaryConfig.api_secret;

	const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

	return signature;
};

export default signUploadWidget;
