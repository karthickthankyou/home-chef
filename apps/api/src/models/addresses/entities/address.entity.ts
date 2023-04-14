import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Address as AddressType } from '@prisma/client'

@ObjectType()
export class Address implements AddressType {
  kitchenId: number
  id: number
  createdAt: Date
  updatedAt: Date
  address: string
  zipCode: string
  @Field(() => Float)
  lat: number
  @Field(() => Float)
  lng: number
}
