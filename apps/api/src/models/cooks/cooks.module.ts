import { Module } from '@nestjs/common'
import { CooksResolver } from './cooks.resolver'
import { CooksService } from './cooks.service'

@Module({
  providers: [CooksResolver, CooksService],
  exports: [CooksService],
})
export class CooksModule {}
