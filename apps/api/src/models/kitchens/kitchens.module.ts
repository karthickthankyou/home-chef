import { Module } from '@nestjs/common'
import { KitchensResolver } from './kitchens.resolver'
import { KitchensService } from './kitchens.service'

@Module({
  providers: [KitchensResolver, KitchensService],
  exports: [KitchensService],
})
export class KitchensModule {}
