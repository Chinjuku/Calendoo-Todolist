import { PrismaClient } from "@prisma/client"
import Router from "express"

const prisma = new PrismaClient()
const router = Router();

router.post("/create", async (req: any, res: any) => {
    try {
      const { namelist, color } = req.body;

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
          color: color
        }
      });
      return res.status(200).send(addList);

    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" }); 
    }
})

export default router
