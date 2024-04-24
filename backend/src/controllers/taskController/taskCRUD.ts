import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createTask = async (req:any, res:any) => {
    try {
        const { boardId, taskname } = req.body
        const createtask = await prisma.task.create({
            data: {
                taskname : taskname,
                boardId : boardId
            }
        })
        res.status(200).send(createtask)
        console.log("Create task!")
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const deleteTask = async (req: any, res: any) => {
    try {
        const taskId = req.params.taskId
        const deletetasklist = await prisma.task.delete({
            where: {
                id: taskId,
            }
        })
        res.status(200).send(deletetasklist)
        console.log("deleteTask")
    } catch (err) {
        res.status(400).json(err)
    }
}