import { Injectable } from '@nestjs/common'
import { FindManyCookArgs, FindUniqueCookArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCookInput } from './dto/create-cook.input'
import { UpdateCookInput } from './dto/update-cook.input'

@Injectable()
export class CooksService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCookInput: CreateCookInput) {
    return this.prisma.cook.create({
      data: createCookInput,
    })
  }

  findAll(args: FindManyCookArgs) {
    return this.prisma.cook.findMany(args)
  }

  findOne(args: FindUniqueCookArgs) {
    return this.prisma.cook.findUnique(args)
  }

  update(updateCookInput: UpdateCookInput) {
    const { uid, ...data } = updateCookInput
    return this.prisma.cook.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueCookArgs) {
    return this.prisma.cook.delete(args)
  }
}
