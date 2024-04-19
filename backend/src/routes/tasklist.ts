import { PrismaClient } from "@prisma/client"
import Router from "express"
import { showTaskLists } from "../controllers/tasklistController/queryTasklist";
import { createTaskList } from "../controllers/tasklistController/tasklistCRUD";

const prisma = new PrismaClient()
const router = Router();

router.post('/create', createTaskList)

router.get('/show/:taskId', showTaskLists)

export default router;