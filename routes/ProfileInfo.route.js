import express from 'express';
import { createNewProfileInfo, deleteProfileInfo, getAllProfileInfo, updateProfileInfo } from '../controllers/profileInfo.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
    .get(getAllProfileInfo)
    .post(upload.single('avatar'), createNewProfileInfo)
    .put(upload.single('avatar'), updateProfileInfo)
    .delete(deleteProfileInfo)


export default router