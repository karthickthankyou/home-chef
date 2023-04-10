import { CreateScheduleInput } from './create-schedule.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Schedule } from '@prisma/client'

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  id: Schedule['id']
}
