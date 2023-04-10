import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { FoodItemRelationFilter } from 'src/models/food-items/dto/where.args'

// implements Required<Prisma.CustomerReviewWhereUniqueInput>
@InputType()
export class CustomerReviewWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class CustomerReviewWhereInput
  implements Required<Prisma.CustomerReviewWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => IntFilter, { nullable: true })
  rating: IntFilter
  @Field(() => StringFilter, { nullable: true })
  text: StringFilter
  @Field(() => StringFilter, { nullable: true })
  customerId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  foodItemId: IntFilter
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: CustomerRelationFilter
  @Field(() => FoodItemRelationFilter, { nullable: true })
  foodItem: FoodItemRelationFilter

  @Field(() => [CustomerReviewWhereInput], { nullable: true })
  AND: CustomerReviewWhereInput[]
  @Field(() => [CustomerReviewWhereInput], { nullable: true })
  OR: CustomerReviewWhereInput[]
  @Field(() => [CustomerReviewWhereInput], { nullable: true })
  NOT: CustomerReviewWhereInput[]
}

@InputType()
export class CustomerReviewListRelationFilter {
  @Field(() => CustomerReviewWhereInput)
  every?: CustomerReviewWhereInput
  @Field(() => CustomerReviewWhereInput)
  some?: CustomerReviewWhereInput
  @Field(() => CustomerReviewWhereInput)
  none?: CustomerReviewWhereInput
}

@InputType()
export class CustomerReviewRelationFilter {
  @Field(() => CustomerReviewWhereInput)
  is?: CustomerReviewWhereInput
  @Field(() => CustomerReviewWhereInput)
  isNot?: CustomerReviewWhereInput
}
