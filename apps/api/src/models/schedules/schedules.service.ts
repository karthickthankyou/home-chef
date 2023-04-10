import { Injectable } from '@nestjs/common'
import { FindManyScheduleArgs, FindUniqueScheduleArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateScheduleInput } from './dto/create-schedule.input'
import { UpdateScheduleInput } from './dto/update-schedule.input'

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createScheduleInput: CreateScheduleInput) {
    return this.prisma.schedule.create({
      data: createScheduleInput,
    })
  }

  findAll(args: FindManyScheduleArgs) {
    return this.prisma.schedule.findMany(args)
  }

  findOne(args: FindUniqueScheduleArgs) {
    return this.prisma.schedule.findUnique(args)
  }

  update(updateScheduleInput: UpdateScheduleInput) {
    const { id, ...data } = updateScheduleInput
    return this.prisma.schedule.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueScheduleArgs) {
    return this.prisma.schedule.delete(args)
  }
}
