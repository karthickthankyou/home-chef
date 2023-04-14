import { Field, InputType, PickType } from '@nestjs/graphql'
import { Customer } from '../entities/customer.entity'
import { CreateAddressInput } from 'src/models/addresses/dto/create-address.input'

@InputType()
export class CreateCustomerInput extends PickType(
  Customer,
  ['name', 'uid'],
  InputType,
) {
  @Field(() => CreateAddressInput)
  address: CreateAddressInput
}
