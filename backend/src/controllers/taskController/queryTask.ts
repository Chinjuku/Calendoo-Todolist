import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showTasks = async (req:any, res:any) => {
    try {
        const boardId = req.params.boardId
        const showtask = await prisma.task.findMany({
                where: { boardId: boardId }
        }).then((showtask) => res.status(200).send(showtask))
        console.log(showtask)
    } catch (err) {
        return res.status(400).json(err)
    }
}