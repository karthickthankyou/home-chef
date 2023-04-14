import { CreateKitchenInput } from './create-kitchen.input'
import { InputType, OmitType, PartialType } from '@nestjs/graphql'
import { Kitchen } from '@prisma/client'

@InputType()
export class UpdateKitchenInput extends PartialType(
  OmitType(CreateKitchenInput, ['address', 'foodItems']),
) {
  id: Kitchen['id']
}
