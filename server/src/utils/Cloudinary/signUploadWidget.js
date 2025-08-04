import { v2 as cloudinary } from 'cloudinary';

const apiSecret = cloudinary.config().api_secret;

// Server-side function used to sign an Upload Widget upload.
const signUploadWidget = () => {
	const timestamp = Math.round(new Date().getTime() / 1000);

	const signature = cloudinary.utils.api_sign_request(
		{
			timestamp: timestamp,
			source: 'uw',
			upload_preset: 'appDayMarOficial',
		},
		apiSecret
	);

	return { timestamp, signature };
};

export default signUploadWidget;
