import { PrismaClient } from "@prisma/client"
import Router from "express"
import { showAllTaskLists, showTaskLists } from "../controllers/tasklistController/queryTasklist";
import { createTaskList, deleteTaskList, updateTaskId } from "../controllers/tasklistController/tasklistCRUD";
import { updateTaskList } from "../controllers/tasklistController/updateTaskList";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTaskList)

router.get('/show/:boardId', showTaskLists)

router.put('/update/taskId', updateTaskId)

router.delete('/delete/:tasklistId', deleteTaskList)

router.put('/update/:id', updateTaskList)

router.get('/showall/:projectId', showAllTaskLists)

export default router;