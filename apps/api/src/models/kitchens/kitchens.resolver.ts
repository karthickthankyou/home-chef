import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { KitchensService } from './kitchens.service'
import { Kitchen } from './entities/kitchen.entity'
import { FindManyKitchenArgs, FindUniqueKitchenArgs } from './dto/find.args'
import { CreateKitchenInput } from './dto/create-kitchen.input'
import { UpdateKitchenInput } from './dto/update-kitchen.input'

@Resolver(() => Kitchen)
export class KitchensResolver {
  constructor(private readonly kitchensService: KitchensService) {}

  @Mutation(() => Kitchen)
  createKitchen(@Args('createKitchenInput') args: CreateKitchenInput) {
    return this.kitchensService.create(args)
  }

  @Query(() => [Kitchen], { name: 'kitchens' })
  findAll(@Args() args: FindManyKitchenArgs) {
    return this.kitchensService.findAll(args)
  }

  @Query(() => Kitchen, { name: 'kitchen' })
  findOne(@Args() args: FindUniqueKitchenArgs) {
    return this.kitchensService.findOne(args)
  }

  @Mutation(() => Kitchen)
  updateKitchen(@Args('updateKitchenInput') args: UpdateKitchenInput) {
    return this.kitchensService.update(args)
  }

  @Mutation(() => Kitchen)
  removeKitchen(@Args() args: FindUniqueKitchenArgs) {
    return this.kitchensService.remove(args)
  }
}
