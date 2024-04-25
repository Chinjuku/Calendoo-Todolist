import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const countTasks = async (req: any, res: any) => {
    try {
        const countTask = await prisma.task.aggregate({
            where : {
                board : {
                    projectId : req.params.projectId 
                }
            },
            _count : true,
        })
        res.status(200).send(countTask)
    } catch (err) {
        res.status(400).send(err)
    }
}