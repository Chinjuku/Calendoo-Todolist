import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createTaskList = async (req:any, res:any) => {
    try {
        const { title, description, piority, taskId } = req.body
        const createtasklist = await prisma.taskList.create({
            data: {
                title: title,
                description: description,
                piority: piority,
                taskId: taskId,
                createdAt: new Date(),
            }
        })
        res.status(200).send(createtasklist)
        console.log("Create task!")
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const updateTaskId = async (req:any, res:any) => {
    try {
        const { taskId, id } = req.body
        const updatetasklist = await prisma.taskList.update({
            where: {
                id: id,
            },
            data: {
                taskId: taskId,
            }
        })
        res.status(200).send(updatetasklist)
        console.log("Create task!")
    } catch (err) {
        return res.status(400).json(err)
    }
}