import { PrismaClient } from "@prisma/client"
import Router from "express"
import { showTaskLists } from "../controllers/tasklistController/queryTasklist";
import { createTaskList, deleteTaskList, updateTaskId } from "../controllers/tasklistController/tasklistCRUD";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTaskList)

router.get('/show/:boardId', showTaskLists)

router.put('/update/taskId', updateTaskId)

router.delete('/delete/:tasklistId', deleteTaskList)

export default router;