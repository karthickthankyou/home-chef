import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { checkRowLevelPermission } from 'src/common/guards'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { CustomerReview } from '../customer-reviews/entities/customer-review.entity'
import { Kitchen } from '../kitchens/entities/kitchen.entity'
import { Schedule } from '../schedules/entities/schedule.entity'
import { CreateFoodItemInput } from './dto/create-food-item.input'
import { FindManyFoodItemArgs, FindUniqueFoodItemArgs } from './dto/find.args'
import { UpdateFoodItemInput } from './dto/update-food-item.input'
import { FoodItem } from './entities/food-item.entity'
import { FoodItemsService } from './food-items.service'

@Resolver(() => FoodItem)
export class FoodItemsResolver {
  constructor(
    private readonly foodItemsService: FoodItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => FoodItem)
  async createFoodItem(
    @Args('createFoodItemInput') args: CreateFoodItemInput,
    @GetUser() user: GetUserType,
  ) {
    const kitchen = await this.prisma.kitchen.findUnique({
      where: { id: args.kitchenId },
    })
    checkRowLevelPermission(user, kitchen.cookId)
    const foodItem = await this.foodItemsService.create(args)

    return foodItem
  }

  @AllowAuthenticated('admin')
  @Query(() => [FoodItem], { name: 'foodItems' })
  findAll(@Args() args: FindManyFoodItemArgs) {
    return this.foodItemsService.findAll(args)
  }

  @Query(() => FoodItem, { name: 'foodItem' })
  findOne(@Args() args: FindUniqueFoodItemArgs) {
    return this.foodItemsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => FoodItem)
  async updateFoodItem(
    @Args('updateFoodItemInput') args: UpdateFoodItemInput,
    @GetUser() user: GetUserType,
  ) {
    const kitchen = await this.prisma.kitchen.findUnique({
      where: { id: args.kitchenId },
    })
    checkRowLevelPermission(user, kitchen.cookId)
    return this.foodItemsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => FoodItem)
  async removeFoodItem(
    @Args() args: FindUniqueFoodItemArgs,
    @GetUser() user: GetUserType,
  ) {
    const foodItem = await this.prisma.foodItem.findUnique({
      ...args,
      select: { kitchen: true },
    })
    checkRowLevelPermission(user, foodItem.kitchen.cookId)

    return this.foodItemsService.remove(args)
  }

  @ResolveField(() => Kitchen)
  kitchen(@Parent() foodItem: FoodItem) {
    return this.prisma.kitchen.findUnique({
      where: { id: foodItem.kitchenId },
    })
  }
  @ResolveField(() => [Schedule])
  schedules(@Parent() foodItem: FoodItem) {
    return this.prisma.schedule.findMany({
      where: { foodItemId: foodItem.id },
    })
  }

  @ResolveField(() => [CustomerReview])
  customerReviews(@Parent() parent: FoodItem) {
    return this.prisma.customerReview.findMany({
      where: {
        foodItemId: parent.id,
      },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => CustomerReview, { nullable: true })
  customerReview(@Parent() parent: FoodItem, @GetUser() user: GetUserType) {
    return this.prisma.customerReview.findUnique({
      where: {
        customerId_foodItemId: {
          customerId: user.uid,
          foodItemId: parent.id,
        },
      },
    })
  }

  @ResolveField(() => AggregateCountOutput, { nullable: true })
  async scheduleCount(@Parent() foodItem: FoodItem) {
    const agg = await this.prisma.schedule.aggregate({
      where: {
        foodItemId: { equals: foodItem.id },
      },
      _count: { foodItemId: true },
    })

    return { count: agg._count.foodItemId || 0 }
  }
}
