import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Order as OrderType, Status } from '@prisma/client'

registerEnumType(Status, { name: 'Status', description: 'Enum for days' })

@ObjectType()
export class Order implements OrderType {
  passcode: string
  id: number
  createdAt: Date
  updatedAt: Date
  @Field(() => Status, { nullable: true })
  status: Status
  customerId: string
  quantity: number
  price: number
  @Field({ nullable: true })
  scheduleId: number
  time: Date
  @Field({ nullable: true })
  tokenNumber: number
}
