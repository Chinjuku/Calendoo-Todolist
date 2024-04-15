import Router from "express"
import { createNote, deleteNote, showNote, updateNote } from "../controllers/noteController/noteCRUD";
import { showDate, showDateNote } from "../controllers/noteController/dateQuery";
import { countAllNotes, countList, countToday } from "../controllers/noteController/countNote";

const router = Router();

router.post('/create', createNote)

router.get('/show/:userId', showNote)

router.put('/update/:noteId', updateNote)

router.delete('/delete/:noteId', deleteNote)

router.get('/showdatenote/:userId/:date', showDateNote)

router.get('/showdate/:userId', showDate)

router.get("/show/countallnote/:userId", countAllNotes)

router.get("/show/countlist/:userId/:listId", countList)

router.get("/show/counttoday/:userId", countToday)

export default router

