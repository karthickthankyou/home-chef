import { InputType, PartialType } from '@nestjs/graphql'
import { FoodItem } from '@prisma/client'
import { CreateFoodItemInput } from './create-food-item.input'

@InputType()
export class UpdateFoodItemInput extends PartialType(CreateFoodItemInput) {
  id: FoodItem['id']
}
