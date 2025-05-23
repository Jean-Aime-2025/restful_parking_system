import express from 'express';
import { checkLoggedIn } from '../middlewares/auth.middleware';
import userDashboardControllers from '../controllers/user-dashboard.controller';

const userDashboardRouter = express.Router()

userDashboardRouter.use(checkLoggedIn)
userDashboardRouter.get('/user',userDashboardControllers.getUserDashboard)

export default userDashboardRouter;