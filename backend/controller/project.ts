import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const createProject = async (req:any, res:any) => {
    try {
        const { projectname, userId, color } = req.body
        const project = await prisma.project.create({
            data: {
                projectname: projectname,
                userId: userId,
                color: color
            }
        })
        res.status(201).send(project)
        console.log("Create project!")
    } catch (err) {
        return res.status(401).json(err)
    }
}

export const showProject = async (req:any, res:any) => {
    try {
        const userId = req.body
        const project = await prisma.project.findMany({
                where: { userId: userId }
        }).then((project) => res.status(201).send(project))
        console.log("Create project!")
    } catch (err) {
        return res.status(401).json(err)
    }
}