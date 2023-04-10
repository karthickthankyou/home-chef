import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { AddressRelationFilter } from 'src/models/addresses/dto/where.args'
import { CustomerReviewListRelationFilter } from 'src/models/customer-reviews/dto/where.args'
import { OrderListRelationFilter } from 'src/models/orders/dto/where.args'
import { ScheduleListRelationFilter } from 'src/models/schedules/dto/where.args'

// implements Required<Prisma.CustomerWhereUniqueInput>
@InputType()
export class CustomerWhereUniqueInput {
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class CustomerWhereInput implements Required<Prisma.CustomerWhereInput> {
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  name: StringFilter
  addressId: IntFilter
  address: AddressRelationFilter
  schedules: ScheduleListRelationFilter
  customerReviews: CustomerReviewListRelationFilter
  orders: OrderListRelationFilter
  // @Field(() => StringFilter, { nullable: true })
  // uid: StringFilter

  @Field(() => [CustomerWhereInput], { nullable: true })
  AND: CustomerWhereInput[]
  @Field(() => [CustomerWhereInput], { nullable: true })
  OR: CustomerWhereInput[]
  @Field(() => [CustomerWhereInput], { nullable: true })
  NOT: CustomerWhereInput[]
}

@InputType()
export class CustomerListRelationFilter {
  @Field(() => CustomerWhereInput)
  every?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  some?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  none?: CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter {
  @Field(() => CustomerWhereInput)
  is?: CustomerWhereInput
  @Field(() => CustomerWhereInput)
  isNot?: CustomerWhereInput
}
