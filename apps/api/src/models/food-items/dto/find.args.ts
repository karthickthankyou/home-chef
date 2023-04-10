import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { WhereUniqueInputNumber } from 'src/common/dtos/common.input'
import { FoodItemOrderByWithRelationInput } from './orderBy.args'
import { FoodItemWhereInput, FoodItemWhereUniqueInput } from './where.args'

registerEnumType(Prisma.FoodItemScalarFieldEnum, {
  name: 'FoodItemScalarFieldEnum',
})

@ArgsType()
export class FindManyFoodItemArgs
  implements Required<Omit<Prisma.FoodItemFindManyArgs, 'include' | 'select'>>
{
  @Field(() => FoodItemWhereInput, { nullable: true })
  where: FoodItemWhereInput
  @Field(() => [FoodItemOrderByWithRelationInput], { nullable: true })
  orderBy: FoodItemOrderByWithRelationInput[]
  @Field(() => WhereUniqueInputNumber, { nullable: true })
  cursor: WhereUniqueInputNumber
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.FoodItemScalarFieldEnum], { nullable: true })
  distinct: Prisma.FoodItemScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueFoodItemArgs {
  @Field({ nullable: true })
  where: FoodItemWhereUniqueInput
}
