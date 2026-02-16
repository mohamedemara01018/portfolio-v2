import express from 'express'
import { getAllProjects } from '../controllers/projects.controller.js';

const router = express.Router();

router.get('/projects', getAllProjects)



export default router