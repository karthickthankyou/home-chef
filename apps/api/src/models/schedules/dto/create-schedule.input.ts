import { InputType, PickType } from '@nestjs/graphql'
import { Schedule } from '../entities/schedule.entity'

@InputType()
export class CreateScheduleInput extends PickType(
  Schedule,
  ['customerId', 'days', 'foodItemId', 'live', 'quantity'],
  InputType,
) {}
