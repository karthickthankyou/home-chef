import { CreateCustomerReviewInput } from './create-customer-review.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { CustomerReview } from '@prisma/client'

@InputType()
export class UpdateCustomerReviewInput extends PartialType(
  CreateCustomerReviewInput,
) {
  id: CustomerReview['id']
}
