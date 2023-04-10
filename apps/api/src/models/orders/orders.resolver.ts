import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { OrdersService } from './orders.service'
import { Order } from './entities/order.entity'
import { FindManyOrderArgs, FindUniqueOrderArgs } from './dto/find.args'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') args: CreateOrderInput) {
    return this.ordersService.create(args)
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(@Args() args: FindManyOrderArgs) {
    return this.ordersService.findAll(args)
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args() args: FindUniqueOrderArgs) {
    return this.ordersService.findOne(args)
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') args: UpdateOrderInput) {
    return this.ordersService.update(args)
  }

  @Mutation(() => Order)
  removeOrder(@Args() args: FindUniqueOrderArgs) {
    return this.ordersService.remove(args)
  }
}
