import { Field, InputType, PickType } from '@nestjs/graphql'
import { CreateAddressInput } from 'src/models/addresses/dto/create-address.input'
import { Customer } from '../entities/customer.entity'

@InputType()
export class CreateCustomerInput extends PickType(
  Customer,
  ['name', 'uid'],
  InputType,
) {
  @Field(() => CreateAddressInput)
  address: CreateAddressInput
}
