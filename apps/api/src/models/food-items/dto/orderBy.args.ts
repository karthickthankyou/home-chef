import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerReviewOrderByRelationAggregateInput } from 'src/models/customer-reviews/dto/orderBy.args'
import { KitchenOrderByWithRelationInput } from 'src/models/kitchens/dto/orderBy.args'
import { ScheduleOrderByRelationAggregateInput } from 'src/models/schedules/dto/orderBy.args'

@InputType()
export class FoodItemOrderByWithRelationInput
  implements Required<Prisma.FoodItemOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  price: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  image: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  maxQuantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  live: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  deliveryAvailable: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  vegan: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  time: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  kitchenId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  days: Prisma.SortOrder
  @Field(() => KitchenOrderByWithRelationInput, { nullable: true })
  kitchen: KitchenOrderByWithRelationInput
  @Field(() => ScheduleOrderByRelationAggregateInput, { nullable: true })
  schedules: ScheduleOrderByRelationAggregateInput
  @Field(() => CustomerReviewOrderByRelationAggregateInput, { nullable: true })
  customerReviews: CustomerReviewOrderByRelationAggregateInput
}

@InputType()
export class FoodItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
