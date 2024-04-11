import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createNote = async (req:any, res:any) => {
    try {  
        const { title, description, listId, date, time, piority, userId } = req.body
        const addnotes = await prisma.note.create({
            data: {
                title: title,
                description: description,
                date: new Date(date),
                time: new Date(`${date}T${time}`),
                piority: piority,
                listId: listId,
                userId: userId
            }
        }).then((addnotes) => res.status(200).json(addnotes))
        console.log(addnotes)
    } catch (err) {
        return res.status(401).send(err)
    }
}

export const showNote = async (req:any, res:any) => {
    try {  
        const userId = req.body
        const notes = await prisma.note.findMany({
            where: { userId: userId }
        }).then((notes) => res.status(200).json(notes))
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
                time: new Date(`${date}T${time}`),
                piority: piority,
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

