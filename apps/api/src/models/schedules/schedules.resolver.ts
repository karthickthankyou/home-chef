import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { SchedulesService } from './schedules.service'
import { Schedule } from './entities/schedule.entity'
import { FindManyScheduleArgs, FindUniqueScheduleArgs } from './dto/find.args'
import { CreateScheduleInput } from './dto/create-schedule.input'
import { UpdateScheduleInput } from './dto/update-schedule.input'

import { Order } from '../orders/entities/order.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { FoodItem } from '../food-items/entities/food-item.entity'
import { Customer } from '../customers/entities/customer.entity'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@home-chefs-org/types'
import { checkRowLevelPermission } from 'src/common/guards'
import { BadRequestException } from '@nestjs/common'
import { SchedulesForKitchenOutput } from 'src/common/dtos/common.input'

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Schedule)
  createSchedule(
    @Args('createScheduleInput') args: CreateScheduleInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)

    return this.schedulesService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Schedule], { name: 'schedules' })
  findAll(@Args() args: FindManyScheduleArgs) {
    return this.schedulesService.findAll(args)
  }

  @Query(() => Schedule, { name: 'schedule' })
  findOne(@Args() args: FindUniqueScheduleArgs) {
    return this.schedulesService.findOne(args)
  }

  @AllowAuthenticated()
  @Query(() => [Schedule], { name: 'schedulesForKitchen' })
  schedulesForKitchen(
    @Args()
    { cursor, distinct, orderBy, skip, take, where }: FindManyScheduleArgs,
    @Args('kitchenId') kitchenId: string,
    @GetUser() user: GetUserType,
  ) {
    if (!kitchenId) {
      throw new BadRequestException('Kitchen id missing.')
    }

    checkRowLevelPermission(user, kitchenId)

    return this.prisma.schedule.findMany({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: { ...where, foodItem: { kitchenId: +kitchenId } },
    })
  }

  @AllowAuthenticated()
  @Query(() => [Schedule], { name: 'schedulesForCustomer' })
  schedulesForCustomer(
    @Args()
    { cursor, distinct, orderBy, skip, take, where }: FindManyScheduleArgs,
    @Args('customerId') customerId: string,
    @GetUser() user: GetUserType,
  ) {
    if (!customerId) {
      throw new BadRequestException('Customer id missing.')
    }

    checkRowLevelPermission(user, customerId)
    console.log('customer id ', customerId)
    return this.schedulesService.findAll({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: { ...where, customerId: { equals: customerId } },
    })
  }

  @Query(() => [SchedulesForKitchenOutput], { name: 'schedulesForCustomerRaw' })
  async schedulesForCustomerRaw(@Args('customerId') customerId: string) {
    if (!customerId) {
      throw new BadRequestException('Customer id missing.')
    }

    const list: {
      time: string
      day: string
      foodItems: SchedulesForKitchenOutput['items'][number]['foodItems']
    }[] = await this.prisma.$queryRaw`
    WITH unpacked_days AS (
    SELECT "FoodItem".name, "FoodItem".time, unnest("Schedule".days) AS day, "Schedule".quantity AS quantity, "FoodItem".id AS foodItemId, "FoodItem".name AS foodItemName, "Kitchen".name AS kitchenName, "Kitchen".id AS kitchenId
    FROM "FoodItem"
    JOIN "Schedule" ON "FoodItem"."id" = "Schedule"."foodItemId"
    JOIN "Kitchen" ON "FoodItem"."kitchenId" = "Kitchen"."id"

    WHERE "Schedule"."customerId" = ${customerId})

    SELECT time, day, json_agg(json_build_object('id', foodItemId, 'quantity', quantity,'name', foodItemName,'kitchenName',kitchenName,'kitchenId',kitchenId)) AS "foodItems"
    FROM unpacked_days
    GROUP BY time, day;

`

    const grouped = list.reduce((acc, cur) => {
      const key = cur.day
      if (!acc[key]) {
        acc[key] = []
      }
      console.log('Acc ', cur)
      acc[key].push(cur)
      return acc
    }, {})

    const result = Object.entries(grouped).map(([day, items]) => ({
      day,
      items,
    }))

    return result
  }

  @Query(() => [SchedulesForKitchenOutput], { name: 'schedulesForKitchenRaw' })
  async schedulesForKitchenRaw(@Args('kitchenId') kitchenId: string) {
    if (!kitchenId) {
      throw new BadRequestException('Kitchen id missing.')
    }

    const list: { time: string; day: string; fooditems: number[] }[] =
      await this.prisma.$queryRaw`
    WITH unpacked_days AS (
        SELECT "FoodItem".name, "FoodItem".time, unnest("FoodItem".days) AS day, "FoodItem".id AS foodItemId
        FROM "FoodItem"
        WHERE "FoodItem"."kitchenId" = ${+kitchenId})

        SELECT time, day, array_agg(foodItemId) AS foodItems
        FROM unpacked_days
        GROUP BY time, day;`

    return Promise.all(
      list.map(async ({ day, time, fooditems }) => ({
        day,
        time,
        foodItems: await this.prisma.foodItem.findMany({
          where: { id: { in: fooditems } },
        }),
      })),
    )
  }

  @AllowAuthenticated()
  @Mutation(() => Schedule)
  updateSchedule(
    @Args('updateScheduleInput') args: UpdateScheduleInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    return this.schedulesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Schedule)
  async removeSchedule(
    @Args() args: FindUniqueScheduleArgs,
    @GetUser() user: GetUserType,
  ) {
    const schedule = await this.prisma.schedule.findUnique(args)
    checkRowLevelPermission(user, schedule.customerId)
    return this.schedulesService.remove(args)
  }

  @ResolveField(() => [Order])
  orders(@Parent() customer: Customer) {
    return this.prisma.order.findMany({
      where: { customerId: customer.uid },
    })
  }

  @ResolveField(() => FoodItem)
  foodItem(@Parent() schedule: Schedule) {
    return this.prisma.foodItem.findUnique({
      where: { id: schedule.foodItemId },
    })
  }

  @ResolveField(() => Customer)
  customer(@Parent() schedule: Schedule) {
    return this.prisma.customer.findUnique({
      where: { uid: schedule.customerId },
    })
  }
}
