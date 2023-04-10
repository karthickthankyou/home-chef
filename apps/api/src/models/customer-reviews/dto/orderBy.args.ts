import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { FoodItemOrderByWithRelationInput } from 'src/models/food-items/dto/orderBy.args'

@InputType()
export class CustomerReviewOrderByWithRelationInput
  implements Required<Prisma.CustomerReviewOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  rating: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  text: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  customerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  foodItemId: Prisma.SortOrder
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
  @Field(() => FoodItemOrderByWithRelationInput, { nullable: true })
  foodItem: FoodItemOrderByWithRelationInput
}

@InputType()
export class CustomerReviewOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
