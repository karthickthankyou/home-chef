import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { KitchenOrderByWithRelationInput } from './orderBy.args'
import { KitchenWhereInput, KitchenWhereUniqueInput } from './where.args'

registerEnumType(Prisma.KitchenScalarFieldEnum, {
  name: 'KitchenScalarFieldEnum',
})

@ArgsType()
export class FindManyKitchenArgs
  implements Required<Omit<Prisma.KitchenFindManyArgs, 'include' | 'select'>>
{
  @Field(() => KitchenWhereInput, { nullable: true })
  where: KitchenWhereInput
  @Field(() => [KitchenOrderByWithRelationInput], { nullable: true })
  orderBy: KitchenOrderByWithRelationInput[]
  @Field(() => KitchenWhereUniqueInput, { nullable: true })
  cursor: KitchenWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.KitchenScalarFieldEnum], { nullable: true })
  distinct: Prisma.KitchenScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueKitchenArgs {
  @Field({ nullable: true })
  where: KitchenWhereUniqueInput
}
