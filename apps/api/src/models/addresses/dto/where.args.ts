import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { CustomerRelationFilter } from 'src/models/customers/dto/where.args'
import { KitchenRelationFilter } from 'src/models/kitchens/dto/where.args'

@InputType()
export class AddressWhereUniqueInput
  implements Required<Prisma.AddressWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class AddressWhereInput implements Required<Prisma.AddressWhereInput> {
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  address: StringFilter
  @Field(() => StringFilter, { nullable: true })
  zipCode: StringFilter
  @Field(() => FloatFilter, { nullable: true })
  lat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  lng: FloatFilter
  @Field(() => KitchenRelationFilter, { nullable: true })
  kitchen: KitchenRelationFilter
  @Field(() => CustomerRelationFilter, { nullable: true })
  customer: CustomerRelationFilter

  @Field(() => [AddressWhereInput], { nullable: true })
  AND: AddressWhereInput[]
  @Field(() => [AddressWhereInput], { nullable: true })
  OR: AddressWhereInput[]
  @Field(() => [AddressWhereInput], { nullable: true })
  NOT: AddressWhereInput[]
}

@InputType()
export class AddressListRelationFilter {
  @Field(() => AddressWhereInput)
  every?: AddressWhereInput
  @Field(() => AddressWhereInput)
  some?: AddressWhereInput
  @Field(() => AddressWhereInput)
  none?: AddressWhereInput
}

@InputType()
export class AddressRelationFilter {
  @Field(() => AddressWhereInput)
  is?: AddressWhereInput
  @Field(() => AddressWhereInput)
  isNot?: AddressWhereInput
}
