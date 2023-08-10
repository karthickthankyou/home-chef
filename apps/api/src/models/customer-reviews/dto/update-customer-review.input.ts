import { InputType, PartialType } from '@nestjs/graphql'
import { CustomerReview } from '@prisma/client'
import { CreateCustomerReviewInput } from './create-customer-review.input'

@InputType()
export class UpdateCustomerReviewInput extends PartialType(
  CreateCustomerReviewInput,
) {
  id: CustomerReview['id']
}
