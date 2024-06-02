import express from "express";
const router = express.Router();
import {login,register} from "../controller/user_controller.js";

router.post('/login',login);
router.post('/register',register);


export default router;
