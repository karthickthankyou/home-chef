import { Module } from '@nestjs/common'
import { CustomerReviewsService } from './customer-reviews.service'
import { CustomerReviewsResolver } from './customer-reviews.resolver'

@Module({
  providers: [CustomerReviewsResolver, CustomerReviewsService],
  exports: [CustomerReviewsService],
})
export class CustomerReviewsModule {}
