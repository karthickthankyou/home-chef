import { Field, ObjectType } from '@nestjs/graphql'
import { Day, Schedule as ScheduleType } from '@prisma/client'

@ObjectType()
export class Schedule implements ScheduleType {
  id: number
  createdAt: Date
  updatedAt: Date
  live: boolean
  customerId: string
  foodItemId: number
  quantity: number
  @Field(() => [Day])
  days: Day[]
}
