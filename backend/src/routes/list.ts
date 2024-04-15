import { PrismaClient } from "@prisma/client"
import Router from "express"
import { createList, showList } from "../controllers/listController/listCRUD";

const prisma = new PrismaClient()
const router = Router();

router.post("/create", createList)

router.get("/showlists/:userId", showList)

export default router
