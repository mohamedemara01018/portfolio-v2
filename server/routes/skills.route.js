import express from 'express';
import { createNewSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from '../controllers/skills.controller.js';


const router = express.Router();

router.get('/', getAllSkills)
router.get('/:id', getSkillById)
router.post('/', createNewSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);


export default router