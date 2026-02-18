import { projectModel } from '../models/projects.model.js';
import asyncWrapper from '../utils/asyncWrapper.js'
import statusValues from '../utils/statusValues.js';


const getAllProjects = asyncWrapper(
    async (req, res, next) => {
        const projects = await projectModel.find({});
        res.status(200).json({ status: statusValues.SUCCESS, data: { projects } })
    }
)

const getProjectById = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const project = await projectModel.findById(id);
        res.status(200).json({ status: statusValues.SUCCESS, data: { project } })
    }
)

const createNewProject = asyncWrapper(
    async (req, res, next) => {
        const newProject = await projectModel.create(req.body);
        return res.status(201).json({
            status: statusValues.SUCCESS,
            message: 'project added successfully',
            data: { project: newProject }
        });
    }
);

const updateProject = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const updatedData = req.body;
        if (!updatedData) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'you must provide data' })
        }
        const updatedProject = await projectModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        )
        if (!updatedProject) {
            return res.status(404).json({
                status: statusValues.FAIL,
                message: 'Project not found'
            });
        }
        res.status(200).json({ status: statusValues.SUCCESS, message: 'project updated successfully' })
    }
)


const deleteProject = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params;
        const deletedProject = await projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({
                status: statusValues.FAIL,
                message: 'Project not found'
            });
        }
        res.status(200).json({ status: statusValues.SUCCESS, message: 'project deleted successfully' })
    }
)

export {
    getAllProjects,
    getProjectById,
    createNewProject,
    updateProject,
    deleteProject
}