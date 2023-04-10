import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { WhereUniqueInputNumber } from 'src/common/dtos/common.input'
import { ScheduleOrderByWithRelationInput } from './orderBy.args'
import { ScheduleWhereInput, ScheduleWhereUniqueInput } from './where.args'

registerEnumType(Prisma.ScheduleScalarFieldEnum, {
  name: 'ScheduleScalarFieldEnum',
})

@ArgsType()
export class FindManyScheduleArgs
  implements Required<Omit<Prisma.ScheduleFindManyArgs, 'include' | 'select'>>
{
  @Field(() => ScheduleWhereInput, { nullable: true })
  where: ScheduleWhereInput
  @Field(() => [ScheduleOrderByWithRelationInput], { nullable: true })
  orderBy: ScheduleOrderByWithRelationInput[]
  @Field(() => WhereUniqueInputNumber, { nullable: true })
  cursor: WhereUniqueInputNumber
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ScheduleScalarFieldEnum], { nullable: true })
  distinct: Prisma.ScheduleScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueScheduleArgs {
  @Field({ nullable: true })
  where: ScheduleWhereUniqueInput
}
