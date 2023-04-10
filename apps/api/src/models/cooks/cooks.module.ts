import { Module } from '@nestjs/common'
import { CooksService } from './cooks.service'
import { CooksResolver } from './cooks.resolver'

@Module({
  providers: [CooksResolver, CooksService],
  exports: [CooksService],
})
export class CooksModule {}
