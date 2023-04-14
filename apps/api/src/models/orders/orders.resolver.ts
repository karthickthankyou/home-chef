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
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@home-chefs-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { SortOrder } from 'src/common/dtos/common.input'

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
    @Args('customerId') customerId: string,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, customerId)

    return this.prisma.order.findMany({
      cursor,
      distinct,
      orderBy: [{ time: SortOrder.desc }],
      skip,
      take,
      where: { ...where, customerId: { equals: customerId } },
    })
  }

  @AllowAuthenticated()
  @Query(() => [Order], { name: 'ordersForKitchen' })
  async findAllOrdersForKitchen(
    @Args() { cursor, distinct, orderBy, skip, take, where }: FindManyOrderArgs,
    @Args('kitchenId') kitchenId: number,
    @GetUser() user: GetUserType,
  ) {
    const kitchen = await this.prisma.kitchen.findUnique({
      where: { id: kitchenId },
    })
    // console.log('Starting...')
    // const orderedOrders = await this.prisma.$queryRaw`SELECT
    //     DATE_TRUNC('day', time) AS date,
    //     TO_CHAR(time, 'HH24:MI') AS time,
    //     JSON_AGG(json_build_object('id', id)) AS items
    //     FROM
    //     "Order"
    //     GROUP BY
    //         DATE_TRUNC('day', time),
    //         TO_CHAR(time, 'HH24:MI')
    //     ORDER BY
    //         time ASC`

    // console.log('orderedOrders', orderedOrders)

    checkRowLevelPermission(user, kitchen.cookId)

    return this.prisma.order.findMany({
      cursor,
      distinct,
      orderBy: [{ time: 'desc' }],
      skip,
      take,
      where: { ...where, schedule: { foodItem: { kitchenId } } },
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

  @ResolveField(() => Schedule)
  schedule(@Parent() order: Order) {
    return this.prisma.schedule.findUnique({
      where: { id: order.scheduleId },
    })
  }
}
