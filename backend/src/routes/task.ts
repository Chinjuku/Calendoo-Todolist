import { PrismaClient } from "@prisma/client"
import Router from "express"
import { createTask, deleteTask } from "../controllers/taskController/taskCRUD";
import { showTasks } from "../controllers/taskController/queryTask";
import { countTasks } from "../controllers/taskController/countTask";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTask)

router.get('/show/:boardId', showTasks)

router.delete('/delete/:taskId', deleteTask)

router.get('/counttask/:projectId', countTasks)

export default router;