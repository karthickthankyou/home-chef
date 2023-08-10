import { Module } from '@nestjs/common'
import { FoodItemsResolver } from './food-items.resolver'
import { FoodItemsService } from './food-items.service'

@Module({
  providers: [FoodItemsResolver, FoodItemsService],
  exports: [FoodItemsService],
})
export class FoodItemsModule {}
