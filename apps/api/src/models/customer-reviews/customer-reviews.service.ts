import { Injectable } from '@nestjs/common'
import {
  FindManyCustomerReviewArgs,
  FindUniqueCustomerReviewArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCustomerReviewInput } from './dto/create-customer-review.input'
import { UpdateCustomerReviewInput } from './dto/update-customer-review.input'

@Injectable()
export class CustomerReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCustomerReviewInput: CreateCustomerReviewInput) {
    return this.prisma.customerReview.create({
      data: createCustomerReviewInput,
    })
  }

  findAll(args: FindManyCustomerReviewArgs) {
    return this.prisma.customerReview.findMany(args)
  }

  findOne(args: FindUniqueCustomerReviewArgs) {
    return this.prisma.customerReview.findUnique(args)
  }

  update(updateCustomerReviewInput: UpdateCustomerReviewInput) {
    const { id, ...data } = updateCustomerReviewInput
    return this.prisma.customerReview.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueCustomerReviewArgs) {
    return this.prisma.customerReview.delete(args)
  }
}
