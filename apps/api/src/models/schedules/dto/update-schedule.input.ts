import { InputType, PartialType } from '@nestjs/graphql'
import { Schedule } from '@prisma/client'
import { CreateScheduleInput } from './create-schedule.input'

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  id: Schedule['id']
}
