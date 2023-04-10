import { ObjectType } from '@nestjs/graphql'
import { Kitchen as KitchenType } from '@prisma/client'

@ObjectType()
export class Kitchen implements KitchenType {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  image: string
  about: string
  open: boolean
  cookId: string
  addressId: number
}
