import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/dto/orderBy.args'
import { KitchenOrderByWithRelationInput } from 'src/models/kitchens/dto/orderBy.args'

@InputType()
export class AddressOrderByWithRelationInput
  implements Required<Prisma.AddressOrderByWithRelationInput>
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  kitchenId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  address: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  zipCode: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  lat: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  lng: Prisma.SortOrder
  @Field(() => KitchenOrderByWithRelationInput, { nullable: true })
  kitchen: KitchenOrderByWithRelationInput
  @Field(() => CustomerOrderByWithRelationInput, { nullable: true })
  customer: CustomerOrderByWithRelationInput
}

@InputType()
export class AddressOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
