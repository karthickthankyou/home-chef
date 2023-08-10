import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dto/find.args'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  create({ address, ...customer }: CreateCustomerInput) {
    return this.prisma.customer.create({
      data: { ...customer, address: { create: address } },
    })
  }

  findAll(args: FindManyCustomerArgs) {
    return this.prisma.customer.findMany(args)
  }

  findOne(args: FindUniqueCustomerArgs) {
    return this.prisma.customer.findUnique(args)
  }

  update(updateCustomerInput: UpdateCustomerInput) {
    const { uid, address, ...data } = updateCustomerInput
    return this.prisma.customer.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueCustomerArgs) {
    return this.prisma.customer.delete(args)
  }
}
