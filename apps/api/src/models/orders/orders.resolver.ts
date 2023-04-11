import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { OrdersService } from './orders.service'
import { Order } from './entities/order.entity'
import { FindManyOrderArgs, FindUniqueOrderArgs } from './dto/find.args'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { Customer } from '../customers/entities/customer.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Schedule } from '../schedules/entities/schedule.entity'

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly prisma: PrismaService,
  ) {}

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

  @ResolveField(() => Customer)
  customer(@Parent() order: Order) {
    return this.prisma.customer.findUnique({
      where: { uid: order.customerId },
    })
  }

  @ResolveField(() => Schedule)
  schedule(@Parent() order: Order) {
    return this.prisma.schedule.findUnique({
      where: { id: order.scheduleId },
    })
  }
}
