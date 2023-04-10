import { ObjectType } from '@nestjs/graphql'
import { Cook as CookType } from '@prisma/client'

@ObjectType()
export class Cook implements CookType {
  uid: string
  createdAt: Date
  updatedAt: Date
}
