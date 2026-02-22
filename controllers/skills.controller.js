import { skillModel } from "../models/skills.model.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import statusValues from "../utils/statusValues.js";


const getAllSkills = asyncWrapper(
    async (req, res, next) => {
        const skills = await skillModel.find({});
        res.status(200).json({ status: statusValues.SUCCESS, data: { skills } })
    }
)

const getSkillById = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params;
        const skill = await skillModel.findById(id);
        res.status(200).json({ status: statusValues.SUCCESS, data: { skill } })
    }
)

const createNewSkill = asyncWrapper(
    async (req, res, next) => {
        const data = req.body;
        if (!data) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'you must provid your skill' })
        }
        const newSkill = await skillModel.create(data);
        res.status(201).json({ status: statusValues.SUCCESS, message: 'skill created successfully', data: { newSkill } })
    }
)

const updateSkill = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params;
        const updatedData = req.body;

        if (!updatedData) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'you must provid your skill' })
        }
        const updatedSkill = await skillModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        )
        if (!updatedSkill) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'skill not found' })
        }
        res.status(200).json({ status: statusValues.SUCCESS, message: 'skill updated successfully' })
    }
)

const deleteSkill = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params;
        const daletedSkill = await skillModel.findByIdAndDelete(id);
        res.status(200).json({ status: statusValues.SUCCESS, message: 'skill deleted successfully' })
    }
)


export {
    getAllSkills,
    getSkillById,
    createNewSkill,
    updateSkill,
    deleteSkill,
}