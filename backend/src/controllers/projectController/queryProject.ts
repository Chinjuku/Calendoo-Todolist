import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showProject = async (req:any, res:any) => {
    try {
        const userId = req.body
        const project = await prisma.project.findMany({
                where: { userId: userId }
        }).then((project) => res.status(201).send(project))
    } catch (err) {
        return res.status(401).json(err)
    }
}

export const showProjectName = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const project = await prisma.project.findFirst({
                where: { id: projectId }
        }).then((project) => res.status(201).send(project))
    } catch (err) {
        return res.status(401).json(err)
    }
}