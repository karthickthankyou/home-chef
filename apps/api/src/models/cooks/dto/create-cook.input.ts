import { Field, InputType, OmitType, PickType } from '@nestjs/graphql'
import { CreateKitchenInput } from 'src/models/kitchens/dto/create-kitchen.input'
import { Cook } from '../entities/cook.entity'

@InputType()
export class CreateKitchenInputWithoutCookId extends OmitType(
  CreateKitchenInput,
  ['cookId'],
) {}

@InputType()
export class CreateCookInput extends PickType(Cook, ['uid'], InputType) {
  @Field(() => CreateKitchenInputWithoutCookId)
  kitchen: CreateKitchenInputWithoutCookId
}
