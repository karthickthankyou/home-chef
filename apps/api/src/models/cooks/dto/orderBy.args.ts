import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { KitchenOrderByWithRelationInput } from 'src/models/kitchens/dto/orderBy.args'

@InputType()
export class CookOrderByWithRelationInput
  implements Required<Prisma.CookOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => KitchenOrderByWithRelationInput, { nullable: true })
  kitchen: KitchenOrderByWithRelationInput
}

@InputType()
export class CookOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
