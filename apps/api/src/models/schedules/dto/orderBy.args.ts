import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { FoodItemOrderByWithRelationInput } from 'src/models/food-items/dto/orderBy.args'
import { OrderOrderByRelationAggregateInput } from 'src/models/orders/dto/orderBy.args'

@InputType()
export class ScheduleOrderByWithRelationInput
  implements Required<Prisma.ScheduleOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  live: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  customerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  foodItemId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  days: Prisma.SortOrder
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
  @Field(() => FoodItemOrderByWithRelationInput, { nullable: true })
  foodItem: FoodItemOrderByWithRelationInput
  @Field(() => OrderOrderByRelationAggregateInput, { nullable: true })
  orders: OrderOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ScheduleOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
