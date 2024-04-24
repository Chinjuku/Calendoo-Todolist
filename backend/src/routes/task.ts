import { PrismaClient } from "@prisma/client"
import Router from "express"
import { createTask, deleteTask } from "../controllers/taskController/taskCRUD";
import { showTasks } from "../controllers/taskController/queryTask";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTask)

router.get('/show/:boardId', showTasks)

router.delete('/delete/:taskId', deleteTask)

export default router;