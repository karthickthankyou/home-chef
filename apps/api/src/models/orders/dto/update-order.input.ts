import { CreateOrderInput } from './create-order.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Order } from '@prisma/client'

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  id: Order['id']
}
