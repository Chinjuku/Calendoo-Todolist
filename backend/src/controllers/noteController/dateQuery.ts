import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showDateNote = async (req:any, res:any) => {
    try {  
        const userId = req.params.userId
        const date = req.params.date
        if (!date) {
            const notes = await prisma.note.findMany({
                where: { date: new Date("2024-04-02T17:00:00.000+00:00"), userId: userId },
                include : {
                    list: true
                }
            })
        }
        const notes = await prisma.note.findMany({
            where: { date: new Date(`${date}`), userId: userId },
            include : {
                list: true
            }
        })
        return res.status(200).json(notes)
    } catch (err) {
        return res.status(401).send(err)
    }
}

export const showDate = async (req:any, res:any) => {
    try {  
        const userId = req.params.userId
        const notes = await prisma.note.findMany({
            where: { 
                userId: userId, 
            },
            orderBy: { date: 'asc' },
            select : {
                date: true
            },
            distinct: ['date']
        })
        return res.status(200).json(notes)
    } catch (err) {
        return res.status(401).send(err)
    }
}
