import { Mutation, Resolver } from '@nestjs/graphql'

import { AllowAuthenticated } from 'src/common/decorators/auth/auth.decorator'
import { Order } from 'src/models/orders/entities/order.entity'
import { SchedulerService } from './scheduler.service'

@AllowAuthenticated('admin')
@Resolver()
export class SchedulerResolver {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Mutation(() => [Order])
  runScheduler() {
    return this.schedulerService.handleCron()
  }
}
