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
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

export const countTasksInBoard = async (req: any, res: any) => {
    try {
        const projectId = req.params.projectId
        const countTasksByBoard = await prisma.board.findMany({
            where : {
                projectId: projectId
            },
            include: {
                _count : {
                    select : {
                        task : true
                    }
                }
            }
        });
        res.status(200).send(countTasksByBoard);
    } catch (err) {
        res.status(400).send(err);
    }
}