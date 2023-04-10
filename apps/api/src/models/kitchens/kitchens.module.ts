import { Module } from '@nestjs/common'
import { KitchensService } from './kitchens.service'
import { KitchensResolver } from './kitchens.resolver'

@Module({
  providers: [KitchensResolver, KitchensService],
  exports: [KitchensService],
})
export class KitchensModule {}
