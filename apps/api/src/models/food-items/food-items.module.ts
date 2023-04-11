import { Module } from '@nestjs/common'
import { FoodItemsService } from './food-items.service'
import { FoodItemsResolver } from './food-items.resolver'
import { MeiliSearchModule } from 'src/meilisearch/meilisearch.module'

@Module({
  imports: [MeiliSearchModule],
  providers: [FoodItemsResolver, FoodItemsService],
  exports: [FoodItemsService],
})
export class FoodItemsModule {}
