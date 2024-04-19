import Router from "express"
import { createBoard } from "../controllers/boardController/boardCRUD";
import { showBoard, showFirstBoard, updateStar } from "../controllers/boardController/queryBoard";
import { countBoards } from "../controllers/boardController/countBoard";

const router = Router();

router.post("/create", createBoard)

router.get("/show/:projectId",  showBoard)

router.get("/showfirst/:projectId", showFirstBoard)

router.get("/count/:projectId", countBoards)

router.put("/updatestar", updateStar)

export default router;
