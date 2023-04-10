import { InputType, PickType } from '@nestjs/graphql'
import { Kitchen } from '../entities/kitchen.entity'

@InputType()
export class CreateKitchenInput extends PickType(
  Kitchen,
  ['about', 'addressId', 'cookId', 'image', 'name', 'open'],
  InputType,
) {}
