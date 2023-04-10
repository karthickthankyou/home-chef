import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { AddressOrderByWithRelationInput } from 'src/models/addresses/dto/orderBy.args'
import { CustomerReviewOrderByRelationAggregateInput } from 'src/models/customer-reviews/dto/orderBy.args'
import { OrderOrderByRelationAggregateInput } from 'src/models/orders/dto/orderBy.args'
import { ScheduleOrderByRelationAggregateInput } from 'src/models/schedules/dto/orderBy.args'

@InputType()
export class CustomerOrderByWithRelationInput
  implements Required<Prisma.CustomerOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  addressId: Prisma.SortOrder
  @Field(() => AddressOrderByWithRelationInput, { nullable: true })
  address: AddressOrderByWithRelationInput
  @Field(() => ScheduleOrderByRelationAggregateInput, { nullable: true })
  schedules: ScheduleOrderByRelationAggregateInput
  @Field(() => CustomerReviewOrderByRelationAggregateInput, { nullable: true })
  customerReviews: CustomerReviewOrderByRelationAggregateInput
  @Field(() => OrderOrderByRelationAggregateInput, { nullable: true })
  orders: OrderOrderByRelationAggregateInput
}

@InputType()
export class CustomerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
