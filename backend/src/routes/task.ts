import { PrismaClient } from "@prisma/client"
import Router from "express"
import { createTask } from "../controllers/taskController/taskCRUD";
import { showTasks } from "../controllers/taskController/queryTask";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTask)

router.get('/show/:boardId', showTasks)

export default router;