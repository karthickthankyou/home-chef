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
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => IntFilter, { nullable: true })
  addressId: IntFilter
  @Field(() => AddressRelationFilter, { nullable: true })
  address: AddressRelationFilter
  @Field(() => ScheduleListRelationFilter, { nullable: true })
  schedules: ScheduleListRelationFilter
  @Field(() => CustomerReviewListRelationFilter, { nullable: true })
  customerReviews: CustomerReviewListRelationFilter
  @Field(() => OrderListRelationFilter, { nullable: true })
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
  @Field(() => CustomerWhereInput, { nullable: true })
  is?: CustomerWhereInput
  @Field(() => CustomerWhereInput, { nullable: true })
  isNot?: CustomerWhereInput
}
