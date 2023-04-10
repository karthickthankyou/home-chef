import { Field, InputType } from '@nestjs/graphql'
import { Prisma, Status } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { ScheduleRelationFilter } from 'src/models/schedules/dto/where.args'

//  implements Required<Prisma.OrderWhereUniqueInput>
@InputType()
export class OrderWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumStatusFilter {
  @Field(() => Status, { nullable: true })
  equals: Status;
  @Field(() => [Status], { nullable: true })
  in: Status[]
  @Field(() => [Status], { nullable: true })
  notIn: Status[]
  @Field(() => Status, { nullable: true })
  not: Status
}

@InputType()
export class OrderWhereInput implements Required<Prisma.OrderWhereInput> {
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => EnumStatusFilter, { nullable: true })
  status: EnumStatusFilter
  @Field(() => StringFilter, { nullable: true })
  customerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => FloatFilter, { nullable: true })
  price: FloatFilter
  @Field(() => IntFilter, { nullable: true })
  scheduleId: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  time: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  tokenNumber: IntFilter
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: CustomerRelationFilter
  @Field(() => ScheduleRelationFilter, { nullable: true })
  schedule: ScheduleRelationFilter

  @Field(() => [OrderWhereInput], { nullable: true })
  AND: OrderWhereInput[]
  @Field(() => [OrderWhereInput], { nullable: true })
  OR: OrderWhereInput[]
  @Field(() => [OrderWhereInput], { nullable: true })
  NOT: OrderWhereInput[]
}

@InputType()
export class OrderListRelationFilter {
  @Field(() => OrderWhereInput)
  every?: OrderWhereInput
  @Field(() => OrderWhereInput)
  some?: OrderWhereInput
  @Field(() => OrderWhereInput)
  none?: OrderWhereInput
}

@InputType()
export class OrderRelationFilter {
  @Field(() => OrderWhereInput)
  is?: OrderWhereInput
  @Field(() => OrderWhereInput)
  isNot?: OrderWhereInput
}
