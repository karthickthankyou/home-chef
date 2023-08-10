import { Module } from '@nestjs/common'
import { CustomerReviewsResolver } from './customer-reviews.resolver'
import { CustomerReviewsService } from './customer-reviews.service'

@Module({
  providers: [CustomerReviewsResolver, CustomerReviewsService],
  exports: [CustomerReviewsService],
})
export class CustomerReviewsModule {}
