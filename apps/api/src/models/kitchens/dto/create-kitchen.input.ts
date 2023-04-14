import { Field, InputType, OmitType, PickType } from '@nestjs/graphql'
import { Kitchen } from '../entities/kitchen.entity'
import { CreateFoodItemInput } from 'src/models/food-items/dto/create-food-item.input'
import { CreateAddressInput } from 'src/models/addresses/dto/create-address.input'

@InputType()
export class CreateKitchenInput extends PickType(
  Kitchen,
  ['about', 'cookId', 'image', 'name', 'open'],
  InputType,
) {
  @Field(() => [CreateFoodItemInputWithoutKitchenId])
  foodItems: CreateFoodItemInputWithoutKitchenId[]
  @Field(() => CreateAddressInput)
  address: CreateAddressInput
}

@InputType()
export class CreateFoodItemInputWithoutKitchenId extends OmitType(
  CreateFoodItemInput,
  ['kitchenId'],
) {}
