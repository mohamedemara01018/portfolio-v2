import { blogModel } from "../models/blog.model.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import statusValues from "../utils/statusValues.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { FolderPathOfCloudinary } from "../utils/constants.js";
import replaceToCloudinary from "../utils/replaceToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";



const getAllBlogs = asyncWrapper(
    async (req, res, next) => {
        const blogs = await blogModel.find({});
        res.status(200).json({ status: statusValues.SUCCESS, data: { blogs } })
    }
)

const getBlogById = asyncWrapper(
    async (req, res, next) => {
        const id = req.params.id;
        const blog = await blogModel.findById(id);
        res.status(200).json({ status: statusValues.SUCCESS, data: { blog } })
    }
)

const createNewBlog = asyncWrapper(
    async (req, res, next) => {
        const data = req.body;
        if (!data) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'you must provide data' })
        }

        // upload image to cloudinary
        const fileName = `image-${Date.now()}`
        const result = await uploadToCloudinary(req.file.buffer, FolderPathOfCloudinary, fileName);

        const newBlog = await blogModel.create({ ...data, coverImage: result.secure_url });
        res.status(201).json({ status: statusValues.SUCCESS, message: 'blog added successfully', data: { newBlog } })
    }
)

const updateBlog = asyncWrapper(
    async (req, res, next) => {

        const { id } = req.params;
        const updatedData = req.body;

        if (!updatedData) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'you must provide data' })
        }

        const existedBlog = await blogModel.findById(id);

        if (!existedBlog) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'blog not found' })
        }

        let coverImageUrl = existedBlog.coverImage;
        if (req.file && req.file.buffer) {
            const result = await replaceToCloudinary(req.file.buffer, coverImageUrl);
            coverImageUrl = result.secure_url;
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { ...updatedData, coverImage: coverImageUrl },
            { new: true, runValidators: true }
        )

        if (!updatedBlog) {
            return res.status(404)
                .json({ status: statusValues.FAIL, message: 'blog not found' })
        }

        res.status(201).json({ status: statusValues.SUCCESS, message: 'blog updated successfully' })
    }
)

const deleteBlog = asyncWrapper(
    async (req, res, next) => {
        const { id } = req.params;

        const existedBlog = await blogModel.findById(id);

        if (!existedBlog) {
            return res.status(404).json({ status: statusValues.FAIL, message: 'blog not found' })
        }

        await deleteFromCloudinary(existedBlog.coverImage);
        
        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404)
                .json({ status: statusValues.FAIL, message: 'blog not found' })
        }

        res.status(200).json({ status: statusValues.SUCCESS, message: 'blog deleted successfully' })
    }
)




export {
    getAllBlogs,
    getBlogById,
    createNewBlog,
    updateBlog,
    deleteBlog
}