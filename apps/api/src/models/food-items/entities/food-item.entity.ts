import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Day, FoodItem as FoodItemType } from '@prisma/client'

registerEnumType(Day, { name: 'Day', description: 'Enum for days' })

@ObjectType()
export class FoodItem implements FoodItemType {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  price: number
  image: string
  maxQuantity: number
  live: boolean
  deliveryAvailable: boolean
  vegan: boolean
  time: Date
  kitchenId: number
  @Field(() => [Day])
  days: Day[]
}
