import { BadRequestException, Injectable } from '@nestjs/common'
import { FindManyCookArgs, FindUniqueCookArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCookInput } from './dto/create-cook.input'

@Injectable()
export class CooksService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    uid,
    kitchen: { address, foodItems, ...kitchen },
  }: CreateCookInput) {
    console.log(uid, kitchen)
    const cook = await this.prisma.cook.findUnique({ where: { uid } })
    if (cook?.uid) {
      throw new BadRequestException('Cook already exists')
    }
    return this.prisma.cook.create({
      data: {
        uid,
        kitchen: {
          create: {
            ...kitchen,
            address: { create: address },
            foodItems: { create: foodItems },
          },
        },
      },
    })
  }

  findAll(args: FindManyCookArgs) {
    return this.prisma.cook.findMany(args)
  }

  findOne(args: FindUniqueCookArgs) {
    return this.prisma.cook.findUnique(args)
  }

  remove(args: FindUniqueCookArgs) {
    return this.prisma.cook.delete(args)
  }
}
