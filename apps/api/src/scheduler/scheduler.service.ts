import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Day } from '@prisma/client'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { OrdersService } from 'src/models/orders/orders.service'

@Injectable()
export class SchedulerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ordersService: OrdersService,
  ) {}

  private readonly logger = new Logger(SchedulerService.name)

  addTimeToTomorrow(timeString: Date) {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const time = new Date(timeString)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(
      time.getUTCHours(),
      time.getUTCMinutes(),
      time.getUTCSeconds(),
    )
    return tomorrow
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const day = this.getDayOfWeek()
    console.log('Day ', day)
    const schedules = await this.prismaService.schedule.findMany({
      where: { days: { has: day }, live: { equals: true } },
      include: { foodItem: true },
    })
    console.log('Schedules ', schedules)

    const orders = schedules.map(async (schedule) => {
      try {
        const time = this.addTimeToTomorrow(schedule.foodItem.time)
        const tokenNumber = await this.ordersService.getTokenNumber(
          schedule.foodItem.kitchenId,
          time.toISOString(),
        )

        const order = await this.ordersService.create({
          customerId: schedule.customerId,
          status: 'UNDELIVERED',
          time,
          scheduleId: schedule.id,
          tokenNumber,
          price: schedule.foodItem.price,
          quantity: schedule.quantity,
        })

        return order
      } catch (error) {
        console.error('Error creating order:', error)
        // You can return a specific value or throw the error to be handled by an outer try-catch block
        return null
      }
    })

    this.logger.debug('Called every day at 6 pm.', schedules, day)
    return orders
  }

  getDayOfWeek() {
    const date = new Date()
    return Object.values(Day)[date.getUTCDay()]
  }
}
