import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { FoodItemsService } from './food-items.service'
import { FoodItem } from './entities/food-item.entity'
import { FindManyFoodItemArgs, FindUniqueFoodItemArgs } from './dto/find.args'
import { CreateFoodItemInput } from './dto/create-food-item.input'
import { UpdateFoodItemInput } from './dto/update-food-item.input'

@Resolver(() => FoodItem)
export class FoodItemsResolver {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Mutation(() => FoodItem)
  createFoodItem(@Args('createFoodItemInput') args: CreateFoodItemInput) {
    return this.foodItemsService.create(args)
  }

  @Query(() => [FoodItem], { name: 'foodItems' })
  findAll(@Args() args: FindManyFoodItemArgs) {
    return this.foodItemsService.findAll(args)
  }

  @Query(() => FoodItem, { name: 'foodItem' })
  findOne(@Args() args: FindUniqueFoodItemArgs) {
    return this.foodItemsService.findOne(args)
  }

  @Mutation(() => FoodItem)
  updateFoodItem(@Args('updateFoodItemInput') args: UpdateFoodItemInput) {
    return this.foodItemsService.update(args)
  }

  @Mutation(() => FoodItem)
  removeFoodItem(@Args() args: FindUniqueFoodItemArgs) {
    return this.foodItemsService.remove(args)
  }
}
