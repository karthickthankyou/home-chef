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
import { GetUserType } from '@common-kitchen-org/types'
import { checkRowLevelPermission } from 'src/common/guards'

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
