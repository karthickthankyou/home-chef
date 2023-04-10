import { ObjectType } from '@nestjs/graphql'
import { Address as AddressType } from '@prisma/client'

@ObjectType()
export class Address implements AddressType {
  id: number
  createdAt: Date
  updatedAt: Date
  address: string
  zipCode: string
  lat: number
  lng: number
}
