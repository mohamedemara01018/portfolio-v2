import cloudinary from "../config/cloudinary.js"
import { getPublicIdFromUrl } from "./getPublicIdFromUrl.js";
import streamifier from 'streamifier'

const replaceToCloudinary = (fileBuffer, url) => {
    return new Promise((resolve, reject) => {

        if (!url) {
            return reject('you must provide the URL')
        }

        const public_id = getPublicIdFromUrl(url);
        const options = {
            public_id,
            overwrite: true,
            invalidate: true
        };

        const stream = cloudinary.uploader.upload_stream(options,
            (err, res) => {
                if (err) reject(err)
                else resolve(res);
            })
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}


export default replaceToCloudinary