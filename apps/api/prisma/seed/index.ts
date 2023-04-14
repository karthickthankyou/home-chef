import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.customerReview.deleteMany()

  await prisma.schedule.deleteMany()
  await prisma.order.deleteMany()
  await prisma.foodItem.deleteMany()
  await prisma.address.deleteMany()

  //   Users
  await prisma.customer.deleteMany()
  await prisma.cook.deleteMany()
  await prisma.kitchen.deleteMany()
}

const reset = async () => {
  await deleteAll()
}

const main = async () => {
  await reset()
}

main()
