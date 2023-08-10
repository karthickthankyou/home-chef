import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { AggregateCountOutput, SortOrder } from 'src/common/dtos/common.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { Customer } from '../customers/entities/customer.entity'
import { Schedule } from '../schedules/entities/schedule.entity'
import { CreateOrderInput } from './dto/create-order.input'
import { FindManyOrderArgs, FindUniqueOrderArgs } from './dto/find.args'
import { UpdateOrderInput } from './dto/update-order.input'
import { OrderWhereInput } from './dto/where.args'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

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

  @AllowAuthenticated()
  @Query(() => [Order], { name: 'ordersForCustomer' })
  async ordersForCustomer(
    @Args() { cursor, distinct, orderBy, skip, take, where }: FindManyOrderArgs,
    @GetUser() user: GetUserType,
  ) {
    const orders = await this.prisma.order.findMany({
      cursor,
      distinct,
      orderBy: [{ time: SortOrder.desc }],
      skip,
      take,
      where: { ...where, customerId: { equals: user.uid } },
    })

    return orders
  }

  @AllowAuthenticated()
  @Query(() => [Order], { name: 'ordersForKitchen' })
  async findAllOrdersForKitchen(
    @Args() { cursor, distinct, orderBy, skip, take, where }: FindManyOrderArgs,
    @GetUser() user: GetUserType,
  ) {
    const kitchen = await this.prisma.kitchen.findUnique({
      where: { cookId: user.uid },
    })

    return this.prisma.order.findMany({
      cursor,
      distinct,
      orderBy: [{ time: 'desc' }],
      skip,
      take,
      where: { ...where, schedule: { foodItem: { kitchenId: kitchen.id } } },
    })
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

  @ResolveField(() => Schedule, { nullable: true })
  schedule(@Parent() order: Order) {
    return this.prisma.schedule.findUnique({
      where: { id: order.scheduleId },
    })
  }

  @Query(() => AggregateCountOutput, {
    name: 'ordersCount',
  })
  async ordersCount(
    @Args('where', { nullable: true })
    where: OrderWhereInput,
  ) {
    const orders = await this.prisma.order.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: orders._count._all }
  }
}
