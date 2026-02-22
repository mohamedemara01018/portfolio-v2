//https://res.cloudinary.com/dwvojiuha/image/upload/v1771548333/portfolio/images/image-1771548331268.png

import { FolderPathOfCloudinary } from "./constants.js";

export const getPublicIdFromUrl = function (url) {
    const splitUrl = url.split('/');
    const lastPart = splitUrl[splitUrl.length - 1];
    const publicId = FolderPathOfCloudinary + '/' + lastPart.split('.')[0];
    return publicId
}
