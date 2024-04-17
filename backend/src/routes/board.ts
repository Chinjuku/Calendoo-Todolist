import { PrismaClient } from "@prisma/client"
import Router from "express"
import { createBoard } from "../controllers/boardController/boardCRUD";
import { showBoard } from "../controllers/boardController/queryBoard";

const prisma = new PrismaClient()
const router = Router();

router.post("/create", createBoard)

router.get("/show",  showBoard)


export default router;
