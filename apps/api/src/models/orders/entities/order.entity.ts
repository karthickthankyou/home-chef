import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Order as OrderType, Status } from '@prisma/client'

registerEnumType(Status, { name: 'Status', description: 'Enum for days' })

@ObjectType()
export class Order implements OrderType {
  id: number
  createdAt: Date
  updatedAt: Date
  @Field(() => Status)
  status: Status
  customerId: string
  quantity: number
  price: number
  scheduleId: number
  time: Date
  tokenNumber: number
}
