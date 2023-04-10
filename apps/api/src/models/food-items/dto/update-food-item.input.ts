import { CreateFoodItemInput } from './create-food-item.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { FoodItem } from '@prisma/client'

@InputType()
export class UpdateFoodItemInput extends PartialType(CreateFoodItemInput) {
  id: FoodItem['id']
}
