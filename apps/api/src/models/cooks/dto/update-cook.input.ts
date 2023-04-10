import { CreateCookInput } from './create-cook.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Cook } from '@prisma/client'

@InputType()
export class UpdateCookInput extends PartialType(CreateCookInput) {
  uid: Cook['uid']
}
