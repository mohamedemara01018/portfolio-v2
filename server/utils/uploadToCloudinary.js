import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier'

const uploadToCloudinary = async (fileBuffer, folder, fileName) => {
    return new Promise((resolve, reject) => {
        const options = {
            folder,
            public_id: fileName,
            overwrite: true
        };

        const stream = cloudinary.uploader.upload_stream(options, (err, res) => {
            if (err) reject(err);
            else resolve(res)
        });
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })

};

export default uploadToCloudinary;