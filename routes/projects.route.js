import express from 'express'
import { createNewProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projects.controller.js';
import upload from '../middleware/upload.middleware.js'
const router = express.Router();

router.route('/')
    .get(getAllProjects)
    .post(upload.single('coverImage'), createNewProject)

router.route('/:id')
    .get(getProjectById)
    .put(upload.single('coverImage'), updateProject)
    .delete(deleteProject)



export default router