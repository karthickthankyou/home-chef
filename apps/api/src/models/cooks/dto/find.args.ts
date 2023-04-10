import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CookOrderByWithRelationInput } from './orderBy.args'
import { CookWhereInput, CookWhereUniqueInput } from './where.args'

registerEnumType(Prisma.CookScalarFieldEnum, {
  name: 'CookScalarFieldEnum',
})

@ArgsType()
export class FindManyCookArgs
  implements Required<Omit<Prisma.CookFindManyArgs, 'include' | 'select'>>
{
  @Field(() => CookWhereInput, { nullable: true })
  where: CookWhereInput
  @Field(() => [CookOrderByWithRelationInput], { nullable: true })
  orderBy: CookOrderByWithRelationInput[]
  @Field(() => CookWhereUniqueInput, { nullable: true })
  cursor: CookWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CookScalarFieldEnum], { nullable: true })
  distinct: Prisma.CookScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCookArgs {
  @Field({ nullable: true })
  where: CookWhereUniqueInput
}
