import { forwardRef, Module } from '@nestjs/common'
import { OrdersModule } from 'src/models/orders/orders.module'
import { SchedulerResolver } from './scheduler.resolver'
import { SchedulerService } from './scheduler.service'

@Module({
  imports: [forwardRef(() => OrdersModule)],
  providers: [SchedulerResolver, SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
