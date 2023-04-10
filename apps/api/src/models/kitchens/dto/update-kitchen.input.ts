import { CreateKitchenInput } from './create-kitchen.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Kitchen } from '@prisma/client'

@InputType()
export class UpdateKitchenInput extends PartialType(CreateKitchenInput) {
  id: Kitchen['id']
}
