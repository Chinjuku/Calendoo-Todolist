import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createList = async (req: any, res: any) => {
    try {
      const { namelist, color, userId } = req.body;

      const checkNameList = await prisma.list.findUnique({
        where: {
          namelist: namelist
        }
      });
  
      if (checkNameList) {
        return res.status(400).send({ message: namelist + " already exists!" });
      }
      const addList = await prisma.list.create({
        data: {
          namelist: namelist,
          color: color,
          userId: userId
        }
      });
      return res.status(200).send(addList);

    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" }); 
    }
}

export const showList = async (req: any, res: any) => {
    try {
      const userId = req.params.userId;
  
      const showList = await prisma.list.findMany({
          where: {
            userId: userId
          }
      });
  
      return res.status(200).send(showList);
  
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" }); 
    }
  }