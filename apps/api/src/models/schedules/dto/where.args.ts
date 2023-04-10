import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import {
  EnumDayListFilter,
  FoodItemRelationFilter,
} from 'src/models/food-items/dto/where.args'
import { OrderListRelationFilter } from 'src/models/orders/dto/where.args'

// implements Required<Prisma.ScheduleWhereUniqueInput>
@InputType()
export class ScheduleWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class ScheduleWhereInput implements Required<Prisma.ScheduleWhereInput> {
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => BoolFilter, { nullable: true })
  live: BoolFilter
  @Field(() => StringFilter, { nullable: true })
  customerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  foodItemId: IntFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => EnumDayListFilter, { nullable: true })
  days: EnumDayListFilter
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: CustomerRelationFilter
  @Field(() => FoodItemRelationFilter, { nullable: true })
  foodItem: FoodItemRelationFilter
  @Field(() => OrderListRelationFilter, { nullable: true })
  orders: OrderListRelationFilter

  @Field(() => [ScheduleWhereInput], { nullable: true })
  AND: ScheduleWhereInput[]
  @Field(() => [ScheduleWhereInput], { nullable: true })
  OR: ScheduleWhereInput[]
  @Field(() => [ScheduleWhereInput], { nullable: true })
  NOT: ScheduleWhereInput[]
}

@InputType()
export class ScheduleListRelationFilter {
  @Field(() => ScheduleWhereInput)
  every?: ScheduleWhereInput
  @Field(() => ScheduleWhereInput)
  some?: ScheduleWhereInput
  @Field(() => ScheduleWhereInput)
  none?: ScheduleWhereInput
}

@InputType()
export class ScheduleRelationFilter {
  @Field(() => ScheduleWhereInput)
  is?: ScheduleWhereInput
  @Field(() => ScheduleWhereInput)
  isNot?: ScheduleWhereInput
}
