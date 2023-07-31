import { Field, ObjectType } from '@nestjs/graphql'
import { Kitchen as KitchenType } from '@prisma/client'

@ObjectType()
export class Kitchen implements KitchenType {
  id: number
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  image: string
  @Field({ nullable: true })
  about: string
  open: boolean
  @Field({ nullable: true })
  cookId: string
  addressId: number
}
