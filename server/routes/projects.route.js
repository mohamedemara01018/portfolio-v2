import express from 'express'
import { createNewProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projects.controller.js';

const router = express.Router();

router.get('/', getAllProjects)
router.get('/:id', getProjectById)
router.post('/', createNewProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)



export default router