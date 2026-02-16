import { projectModel as Project } from '../models/projects.model.js';
import asyncWrapper from '../utils/asyncWrapper.js'
import statusValues from '../utils/statusValues.js';


const getAllProjects = asyncWrapper(
    async (req, res, next) => {
        const projects = await Project.find({});
        res.status(200).json({ status: statusValues.SUCCESS, data: { projects } })
    }
)

export {
    getAllProjects
}