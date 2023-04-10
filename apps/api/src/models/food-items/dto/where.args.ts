import { Field, InputType } from '@nestjs/graphql'
import { Day, Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerReviewListRelationFilter } from 'src/models/customer-reviews/dto/where.args'
import { KitchenRelationFilter } from 'src/models/kitchens/dto/where.args'
import { ScheduleListRelationFilter } from 'src/models/schedules/dto/where.args'

@InputType()
export class FoodItemWhereUniqueInput
  implements Required<Prisma.FoodItemWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class EnumDayListFilter {
  @Field(() => Day, { nullable: true })
  equals: Day;
  @Field(() => [Day], { nullable: true })
  in: Day[]
  @Field(() => [Day], { nullable: true })
  notIn: Day[]
  @Field(() => Day, { nullable: true })
  not: Day
}

@InputType()
export class FoodItemWhereInput implements Required<Prisma.FoodItemWhereInput> {
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  description: StringFilter
  @Field(() => FloatFilter, { nullable: true })
  price: FloatFilter
  @Field(() => StringFilter, { nullable: true })
  image: StringFilter
  @Field(() => IntFilter, { nullable: true })
  maxQuantity: IntFilter
  @Field(() => BoolFilter, { nullable: true })
  live: BoolFilter
  @Field(() => BoolFilter, { nullable: true })
  deliveryAvailable: BoolFilter
  @Field(() => BoolFilter, { nullable: true })
  vegan: BoolFilter
  @Field(() => DateTimeFilter, { nullable: true })
  time: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  kitchenId: IntFilter
  @Field(() => EnumDayListFilter, { nullable: true })
  days: EnumDayListFilter
  @Field(() => KitchenRelationFilter, { nullable: true })
  kitchen: KitchenRelationFilter
  @Field(() => ScheduleListRelationFilter, { nullable: true })
  schedules: ScheduleListRelationFilter
  @Field(() => CustomerReviewListRelationFilter, { nullable: true })
  customerReviews: CustomerReviewListRelationFilter

  @Field(() => [FoodItemWhereInput], { nullable: true })
  AND: FoodItemWhereInput[]
  @Field(() => [FoodItemWhereInput], { nullable: true })
  OR: FoodItemWhereInput[]
  @Field(() => [FoodItemWhereInput], { nullable: true })
  NOT: FoodItemWhereInput[]
}

@InputType()
export class FoodItemListRelationFilter {
  @Field(() => FoodItemWhereInput)
  every?: FoodItemWhereInput
  @Field(() => FoodItemWhereInput)
  some?: FoodItemWhereInput
  @Field(() => FoodItemWhereInput)
  none?: FoodItemWhereInput
}

@InputType()
export class FoodItemRelationFilter {
  @Field(() => FoodItemWhereInput)
  is?: FoodItemWhereInput
  @Field(() => FoodItemWhereInput)
  isNot?: FoodItemWhereInput
}
