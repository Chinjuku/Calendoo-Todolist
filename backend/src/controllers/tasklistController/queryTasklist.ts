import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showTaskLists = async (req:any, res:any) => {
    try {
        const taskId = req.params.taskId
        const showtasklist = await prisma.taskList.findMany({
            where: { 
                taskId: taskId
            }
        }).then((showtasklist) => res.status(200).send(showtasklist))
        console.log(showtasklist)
    } catch (err) {
        return res.status(400).json(err)
    }
}