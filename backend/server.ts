// Generate data using only PrismaClient and MongoDB
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //  const add = await prisma.user.create({
    //     data: {
    //       username: ' Chinjuku',
    //       email: 'cj@prisma.com',
    //       password: '12345678',
    //     },
    //   })
    //   const addList = await prisma.list.create({
    //     data: {
    //       namelist: 'Work',
    //       color: 'blue',
    //     },
    //   })
    //   const addnotes = await prisma.note.create({
    //     data: {
    //       title: 'Chinjuku',
    //       description: 'Embark on a journey of productivity and organization with our meticulously crafted to-do list. Designed to streamline your tasks and prioritize your goals, our to-do list is your steadfast companion in navigating life\'s challenges. Whether it\'s conquering daily errands, with confidence.',
    //       date: new Date("2024-04-10"),
    //       time: new Date("2024-04-10T14:44"),
    //       piority: 3,
    //       listId: "661585579279f578be1916e6",
    //       userId: "661583bda7831d01d00d8a4f",
    //     },
    //   })
      
      const allUsers = await prisma.note.findMany({
        where: {
          userId: "661583bda7831d01d00d8a4f",
        },
      })

    //   console.log(addnotes)
      console.dir(allUsers, { depth: null })
}

main()
  .catch(async (e) => {
    console.error(e)
    // process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })