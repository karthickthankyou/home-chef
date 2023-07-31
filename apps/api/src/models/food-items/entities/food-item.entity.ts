import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Day, FoodItem as FoodItemType } from '@prisma/client'

registerEnumType(Day, { name: 'Day', description: 'Enum for days' })

@ObjectType()
export class FoodItem implements FoodItemType {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  @Field({ nullable: true })
  description: string
  price: number
  @Field({ nullable: true })
  image: string
  maxQuantity: number
  @Field({ nullable: true })
  live: boolean
  @Field({ nullable: true })
  deliveryAvailable: boolean
  @Field({ nullable: true })
  vegan: boolean
  time: Date
  kitchenId: number
  @Field(() => [Day])
  days: Day[]
}
