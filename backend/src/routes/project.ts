import Router from "express"
import { createProject } from "../controllers/projectController/createProject";
import { showProject, showProjectName } from "../controllers/projectController/queryProject";

const router = Router();

router.post('/create', createProject)

router.get('/show/:userId', showProject)

router.get('/showprojectname/:projectId', showProjectName)

export default router