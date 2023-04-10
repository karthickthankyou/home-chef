import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { AddressOrderByWithRelationInput } from 'src/models/addresses/dto/orderBy.args'
import { CookOrderByWithRelationInput } from 'src/models/cooks/dto/orderBy.args'
import { FoodItemOrderByRelationAggregateInput } from 'src/models/food-items/dto/orderBy.args'

@InputType()
export class KitchenOrderByWithRelationInput
  implements Required<Prisma.KitchenOrderByWithRelationInput>
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
  image: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  about: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  open: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  cookId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  addressId: Prisma.SortOrder
  @Field(() => CookOrderByWithRelationInput, { nullable: true })
  cook: CookOrderByWithRelationInput
  @Field(() => AddressOrderByWithRelationInput, { nullable: true })
  address: AddressOrderByWithRelationInput
  @Field(() => FoodItemOrderByRelationAggregateInput, { nullable: true })
  foodItems: FoodItemOrderByRelationAggregateInput
}

@InputType()
export class KitchenOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
