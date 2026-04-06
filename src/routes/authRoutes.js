import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchaema,
} from '../validations/authValidation.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchaema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default router;
