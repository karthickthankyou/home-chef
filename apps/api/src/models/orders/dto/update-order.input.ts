import { InputType, PartialType } from '@nestjs/graphql'
import { Order } from '@prisma/client'
import { CreateOrderInput } from './create-order.input'

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  id: Order['id']
}
