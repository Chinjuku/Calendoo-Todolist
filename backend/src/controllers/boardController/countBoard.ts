import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const countBoards = async (req: any, res: any) => {
    try {
        const projectId = req.params.projectId
        const countboard = await prisma.board.aggregate({
            where : {
                projectId : projectId
            },
            _count : true,
        })
        res.status(200).send(countboard)
        // console.log(countboard, projectId)
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}