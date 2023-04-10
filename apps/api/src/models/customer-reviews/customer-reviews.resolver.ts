import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CustomerReviewsService } from './customer-reviews.service'
import { CustomerReview } from './entities/customer-review.entity'
import {
  FindManyCustomerReviewArgs,
  FindUniqueCustomerReviewArgs,
} from './dto/find.args'
import { CreateCustomerReviewInput } from './dto/create-customer-review.input'
import { UpdateCustomerReviewInput } from './dto/update-customer-review.input'

@Resolver(() => CustomerReview)
export class CustomerReviewsResolver {
  constructor(
    private readonly customerReviewsService: CustomerReviewsService,
  ) {}

  @Mutation(() => CustomerReview)
  createCustomerReview(
    @Args('createCustomerReviewInput') args: CreateCustomerReviewInput,
  ) {
    return this.customerReviewsService.create(args)
  }

  @Query(() => [CustomerReview], { name: 'customerReviews' })
  findAll(@Args() args: FindManyCustomerReviewArgs) {
    return this.customerReviewsService.findAll(args)
  }

  @Query(() => CustomerReview, { name: 'customerReview' })
  findOne(@Args() args: FindUniqueCustomerReviewArgs) {
    return this.customerReviewsService.findOne(args)
  }

  @Mutation(() => CustomerReview)
  updateCustomerReview(
    @Args('updateCustomerReviewInput') args: UpdateCustomerReviewInput,
  ) {
    return this.customerReviewsService.update(args)
  }

  @Mutation(() => CustomerReview)
  removeCustomerReview(@Args() args: FindUniqueCustomerReviewArgs) {
    return this.customerReviewsService.remove(args)
  }
}
