import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SchedulesService } from './schedules.service'
import { Schedule } from './entities/schedule.entity'
import { FindManyScheduleArgs, FindUniqueScheduleArgs } from './dto/find.args'
import { CreateScheduleInput } from './dto/create-schedule.input'
import { UpdateScheduleInput } from './dto/update-schedule.input'

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args('createScheduleInput') args: CreateScheduleInput) {
    return this.schedulesService.create(args)
  }

  @Query(() => [Schedule], { name: 'schedules' })
  findAll(@Args() args: FindManyScheduleArgs) {
    return this.schedulesService.findAll(args)
  }

  @Query(() => Schedule, { name: 'schedule' })
  findOne(@Args() args: FindUniqueScheduleArgs) {
    return this.schedulesService.findOne(args)
  }

  @Mutation(() => Schedule)
  updateSchedule(@Args('updateScheduleInput') args: UpdateScheduleInput) {
    return this.schedulesService.update(args)
  }

  @Mutation(() => Schedule)
  removeSchedule(@Args() args: FindUniqueScheduleArgs) {
    return this.schedulesService.remove(args)
  }
}
