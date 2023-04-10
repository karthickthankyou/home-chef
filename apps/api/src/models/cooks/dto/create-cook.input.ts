import { InputType, PickType } from '@nestjs/graphql'
import { Cook } from '../entities/cook.entity'

@InputType()
export class CreateCookInput extends PickType(Cook, ['uid'], InputType) {}
