import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const countAllNotes = async (req: any, res: any) => {
    try {
        const userId = req.params.userId
        const notes = await prisma.note.aggregate({
            where : {
                userId: userId
            },
            _count : true,
        })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const countToday = async (req: any, res: any) => {
    try {
        const userId = req.params.userId
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const notes = await prisma.note.aggregate({
            where : {
                userId: userId,
                date: {
                    gte: today,
                    lte: tomorrow,
                }
            },
            _count : true,
        })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const countList = async (req: any, res: any) => {
    try {
        const userId = req.params.userId
        const listId = req.params.listId
        const list = await prisma.note.aggregate({
            where: {
                userId: userId,
                listId: listId
            },
            _count: true,
        })
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}