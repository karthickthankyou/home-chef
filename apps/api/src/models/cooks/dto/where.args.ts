import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { DateTimeFilter, StringFilter } from 'src/common/dtos/common.input'

import { KitchenRelationFilter } from 'src/models/kitchens/dto/where.args'

@InputType()
export class CookWhereUniqueInput
  implements Required<Prisma.CookWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class CookWhereInput implements Required<Prisma.CookWhereInput> {
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => KitchenRelationFilter, { nullable: true })
  kitchen: KitchenRelationFilter

  @Field(() => [CookWhereInput], { nullable: true })
  AND: CookWhereInput[]
  @Field(() => [CookWhereInput], { nullable: true })
  OR: CookWhereInput[]
  @Field(() => [CookWhereInput], { nullable: true })
  NOT: CookWhereInput[]
}

@InputType()
export class CookListRelationFilter {
  @Field(() => CookWhereInput)
  every?: CookWhereInput
  @Field(() => CookWhereInput)
  some?: CookWhereInput
  @Field(() => CookWhereInput)
  none?: CookWhereInput
}

@InputType()
export class CookRelationFilter {
  @Field(() => CookWhereInput)
  is?: CookWhereInput
  @Field(() => CookWhereInput)
  isNot?: CookWhereInput
}
