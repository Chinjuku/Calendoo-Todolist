import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createProject = async (req:any, res:any) => {
    try {
        const { projectname, userId, color } = req.body
        const instead = await prisma.project.findUnique({
            where: {
                projectname: projectname,
                userId: userId
            }
        })
        if (instead !== null) {
            return res.status(400).send({
                message: "Project already exists"
            })
        }
        const project = await prisma.project.create({
            data: {
                projectname: projectname,
                userId: userId,
                color: color
            }
        })
        res.status(200).send(project)
        console.log("Create project!")
    } catch (err) {
        return res.status(401).json(err)
    }
}