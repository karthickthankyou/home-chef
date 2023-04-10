import { InputType, PickType } from '@nestjs/graphql'
import { Order } from '../entities/order.entity'

@InputType()
export class CreateOrderInput extends PickType(
  Order,
  [
    'customerId',
    'price',
    'quantity',
    'scheduleId',
    'status',
    'time',
    'tokenNumber',
  ],
  InputType,
) {}
