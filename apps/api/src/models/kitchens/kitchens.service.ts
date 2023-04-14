import { Injectable } from '@nestjs/common'
import { FindManyKitchenArgs, FindUniqueKitchenArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateKitchenInput } from './dto/create-kitchen.input'
import { UpdateKitchenInput } from './dto/update-kitchen.input'

@Injectable()
export class KitchensService {
  constructor(private readonly prisma: PrismaService) {}
  create({ address, foodItems, ...kitchen }: CreateKitchenInput) {
    return this.prisma.kitchen.create({
      data: {
        ...kitchen,
        address: { create: address },
        foodItems: { create: foodItems },
      },
    })
  }

  findAll(args: FindManyKitchenArgs) {
    return this.prisma.kitchen.findMany(args)
  }

  findOne(args: FindUniqueKitchenArgs) {
    return this.prisma.kitchen.findUnique(args)
  }

  update(updateKitchenInput: UpdateKitchenInput) {
    const { id, ...data } = updateKitchenInput
    return this.prisma.kitchen.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueKitchenArgs) {
    return this.prisma.kitchen.delete(args)
  }
}
