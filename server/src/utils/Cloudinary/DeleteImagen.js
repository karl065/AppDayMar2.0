import { v2 as cloudinary } from 'cloudinary';

const deleteImagen = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		return result;
	} catch (error) {
		return error.message;
	}
};

export default deleteImagen;
