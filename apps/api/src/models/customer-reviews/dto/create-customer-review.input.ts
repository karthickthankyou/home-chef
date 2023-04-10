import { InputType, PickType } from '@nestjs/graphql'
import { CustomerReview } from '../entities/customer-review.entity'

@InputType()
export class CreateCustomerReviewInput extends PickType(
  CustomerReview,
  ['customerId', 'foodItemId', 'rating', 'text'],
  InputType,
) {}
