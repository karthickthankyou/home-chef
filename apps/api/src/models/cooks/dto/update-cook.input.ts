import { InputType, PartialType } from '@nestjs/graphql'
import { Cook } from '@prisma/client'
import { CreateCookInput } from './create-cook.input'

@InputType()
export class UpdateCookInput extends PartialType(CreateCookInput) {
  uid: Cook['uid']
}
