import { InputType, PickType } from '@nestjs/graphql'
import { FoodItem } from '../entities/food-item.entity'

@InputType()
export class CreateFoodItemInput extends PickType(
  FoodItem,
  [
    'days',
    'deliveryAvailable',
    'description',
    'image',
    'kitchenId',
    'live',
    'maxQuantity',
    'name',
    'price',
    'time',
    'vegan',
  ],
  InputType,
) {}
