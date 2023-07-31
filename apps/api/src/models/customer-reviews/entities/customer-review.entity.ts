import { Field, ObjectType } from '@nestjs/graphql'
import { CustomerReview as CustomerReviewType } from '@prisma/client'

@ObjectType()
export class CustomerReview implements CustomerReviewType {
  id: number
  createdAt: Date
  updatedAt: Date
  rating: number
  @Field({ nullable: true })
  text: string
  customerId: string
  foodItemId: number
}
