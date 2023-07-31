import { Field, ObjectType } from '@nestjs/graphql'
import { Customer as CustomerType } from '@prisma/client'

@ObjectType()
export class Customer implements CustomerType {
  uid: string
  createdAt: Date
  updatedAt: Date
  name: string
  @Field({ nullable: true })
  addressId: number
}
