import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { ScheduleOrderByWithRelationInput } from 'src/models/schedules/dto/orderBy.args'

@InputType()
export class OrderOrderByWithRelationInput
  implements Required<Prisma.OrderOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  passcode: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  customerId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  price: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  scheduleId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  time: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  tokenNumber: Prisma.SortOrder
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
  @Field(() => ScheduleOrderByWithRelationInput, { nullable: true })
  schedule: ScheduleOrderByWithRelationInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class OrderOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
