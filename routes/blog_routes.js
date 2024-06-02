import express from "express";
import { add_blog,edit_blog,delete_blog,get_all_blogs,get_blog_by_id } from "../controller/blog_controller.js";
const router = express.Router();


router.post('/blogs',add_blog);
router.patch('/blogs:id',edit_blog);
router.delete('/blogs/:id',delete_blog);
router.get('/blog/:id',get_blog_by_id);
router.get('/blogs',get_all_blogs);


export default router;