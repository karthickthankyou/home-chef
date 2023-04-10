import { Module } from '@nestjs/common'
import { SchedulesService } from './schedules.service'
import { SchedulesResolver } from './schedules.resolver'

@Module({
  providers: [SchedulesResolver, SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
