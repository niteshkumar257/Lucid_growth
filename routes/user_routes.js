import express from "express";
const router = express.Router();
import {login,register,edit_profile} from "../controller/user_controller.js";

router.post('/login',login);
router.post('/register',register);
router.patch('/edit_profile',edit_profile);


export default router;
