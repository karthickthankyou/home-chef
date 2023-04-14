import { Module } from '@nestjs/common'
import { FoodItemsService } from './food-items.service'
import { FoodItemsResolver } from './food-items.resolver'

@Module({
  providers: [FoodItemsResolver, FoodItemsService],
  exports: [FoodItemsService],
})
export class FoodItemsModule {}
