import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerReviewOrderByWithRelationInput } from './orderBy.args'
import {
  CustomerReviewWhereInput,
  CustomerReviewWhereUniqueInput,
} from './where.args'

registerEnumType(Prisma.CustomerReviewScalarFieldEnum, {
  name: 'CustomerReviewScalarFieldEnum',
})

@ArgsType()
export class FindManyCustomerReviewArgs
  implements
    Required<Omit<Prisma.CustomerReviewFindManyArgs, 'include' | 'select'>>
{
  @Field(() => CustomerReviewWhereInput, { nullable: true })
  where: CustomerReviewWhereInput
  @Field(() => [CustomerReviewOrderByWithRelationInput], { nullable: true })
  orderBy: CustomerReviewOrderByWithRelationInput[]
  @Field(() => CustomerReviewWhereUniqueInput, { nullable: true })
  cursor: CustomerReviewWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.CustomerReviewScalarFieldEnum], { nullable: true })
  distinct: Prisma.CustomerReviewScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueCustomerReviewArgs {
  @Field({ nullable: true })
  where: CustomerReviewWhereUniqueInput
}
