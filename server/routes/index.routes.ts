import { Router } from 'express';
import * as userController from '../controller/user.controller';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import companyRoutes from './company.route';
import cityRoutes from './city.routes';
import uploadRoutes from './upload.route';

const router = Router();

router.post('/user', userRoutes,userController.registerPost);
router.post('/auth',authRoutes);
router.post('/company',companyRoutes);
router.post("/city", cityRoutes);
router.post("/upload", uploadRoutes);
export default router;