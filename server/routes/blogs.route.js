import express from 'express';
import { createNewBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogs.controller.js';
import upload from '../middleware/upload.middleware.js';


const router = express.Router();

router.route('/')
    .get(getAllBlogs)
    .post(upload.single('coverImage'), createNewBlog)


router.route('/:id')
    .get(getBlogById)
    .put(updateBlog)
    .delete(deleteBlog)


export default router;