import { Injectable } from '@nestjs/common'
import { FindManyOrderArgs, FindUniqueOrderArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrderInput: CreateOrderInput) {
    return this.prisma.order.create({
      data: createOrderInput,
    })
  }

  findAll(args: FindManyOrderArgs) {
    return this.prisma.order.findMany(args)
  }

  findOne(args: FindUniqueOrderArgs) {
    return this.prisma.order.findUnique(args)
  }

  update(updateOrderInput: UpdateOrderInput) {
    const { id, ...data } = updateOrderInput
    return this.prisma.order.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueOrderArgs) {
    return this.prisma.order.delete(args)
  }

  async getTokenNumber(kitchenId: number, date: string) {
    console.log('Date: ', date)
    const {
      _count: { id },
    } = await this.prisma.order.aggregate({
      where: {
        schedule: {
          foodItem: {
            kitchenId,
          },
        },
        createdAt: {
          gte: new Date(date),
        },
      },
      _count: {
        id: true,
      },
    })

    return id + 1
  }
}
