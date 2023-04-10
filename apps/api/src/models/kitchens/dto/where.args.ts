import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { AddressRelationFilter } from 'src/models/addresses/dto/where.args'
import { CookRelationFilter } from 'src/models/cooks/dto/where.args'
import { FoodItemListRelationFilter } from 'src/models/food-items/dto/where.args'

// implements Required<Prisma.KitchenWhereUniqueInput>
@InputType()
export class KitchenWhereUniqueInput {
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class KitchenWhereInput implements Required<Prisma.KitchenWhereInput> {
  @Field(() => FoodItemListRelationFilter, { nullable: true })
  foodItems: FoodItemListRelationFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StringFilter, { nullable: true })
  image: StringFilter
  @Field(() => StringFilter, { nullable: true })
  about: StringFilter
  @Field(() => BoolFilter, { nullable: true })
  open: BoolFilter
  @Field(() => StringFilter, { nullable: true })
  cookId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  addressId: IntFilter
  @Field(() => CookRelationFilter, { nullable: true })
  cook: CookRelationFilter
  @Field(() => AddressRelationFilter, { nullable: true })
  address: AddressRelationFilter

  @Field(() => [KitchenWhereInput], { nullable: true })
  AND: KitchenWhereInput[]
  @Field(() => [KitchenWhereInput], { nullable: true })
  OR: KitchenWhereInput[]
  @Field(() => [KitchenWhereInput], { nullable: true })
  NOT: KitchenWhereInput[]
}

@InputType()
export class KitchenListRelationFilter {
  @Field(() => KitchenWhereInput)
  every?: KitchenWhereInput
  @Field(() => KitchenWhereInput)
  some?: KitchenWhereInput
  @Field(() => KitchenWhereInput)
  none?: KitchenWhereInput
}

@InputType()
export class KitchenRelationFilter {
  @Field(() => KitchenWhereInput)
  is?: KitchenWhereInput
  @Field(() => KitchenWhereInput)
  isNot?: KitchenWhereInput
}
