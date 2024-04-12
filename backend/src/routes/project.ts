import { PrismaClient } from "@prisma/client"
import Router from "express"

const prisma = new PrismaClient()
const router = Router();

router.post('/create', async (req:any, res:any) => {
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
})

router.get('/show/:userId', async (req:any, res:any) => {
    try {
        const userId = req.body
        const project = await prisma.project.findMany({
                where: { userId: userId }
        }).then((project) => res.status(201).send(project))
        console.log("Show!")
    } catch (err) {
        return res.status(401).json(err)
    }
})

export default router