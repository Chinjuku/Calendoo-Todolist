import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import moment from "moment"

export const createNote = async (req:any, res:any) => {
    try {  
        const { title, description, listId, date, time, piority, userId } = req.body
        const formatdate = moment(date).format("YYYY-MM-DD")
        console.log(formatdate)
        const addnotes = await prisma.note.create({
            data: {
                title: title,
                description: description,
                date: new Date(formatdate),
                time: new Date(`${formatdate}T${time}`),
                piority: piority,
                listId: listId,
                userId: userId
            }
        }).then((addnotes) => res.status(200).json(addnotes))
        
    } catch (err) {
        console.error(err);
        return res.status(401).send(err)
    }
}

export const showNote = async (req:any, res:any) => {
    try {  
        const userId = req.params.userId
        const notes = await prisma.note.findMany({
            where: { 
                userId: userId, 
            },
            include : {
                list: true
            },
        })
        return res.status(200).json(notes)
    } catch (err) {
        return res.status(401).send(err)
    }
}

export const updateNote = async (req:any, res:any) => {
    try {  
        const { title, description, listId, date, time, piority } = req.body
        const noteId = req.params.noteId
        const updateNote = await prisma.note.update({
            where: {
              id: noteId
            },
            data : {
                title: title,
                description: description,
                date: new Date(date),
                time: new Date(time),
                piority: parseInt(piority),
                listId: listId
            }
        }).then((updateNote) => res.status(200).json(updateNote))
        console.log("update note successfully!")
    } catch (err) {
        return res.status(401).send(err)
    }
}

export const deleteNote = async (req:any, res:any) => {
    try {  
        const noteId = req.params.noteId
        const deleteNote = await prisma.note.delete({
            where: {
              id: noteId  
            }
        }).then((deleteNote) => res.status(200).json(deleteNote))
        console.log("delete note successfully!")
    } catch (err) {
        return res.status(401).send(err)
    }
}