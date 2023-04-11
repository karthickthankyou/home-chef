import { Module } from '@nestjs/common'
import { MeiliSearchService } from './meilisearch.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [MeiliSearchService],
  exports: [MeiliSearchService],
})
export class MeiliSearchModule {}
