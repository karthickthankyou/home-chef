import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CooksService } from './cooks.service'
import { Cook } from './entities/cook.entity'
import { FindManyCookArgs, FindUniqueCookArgs } from './dto/find.args'
import { CreateCookInput } from './dto/create-cook.input'
import { UpdateCookInput } from './dto/update-cook.input'

@Resolver(() => Cook)
export class CooksResolver {
  constructor(private readonly cooksService: CooksService) {}

  @Mutation(() => Cook)
  createCook(@Args('createCookInput') args: CreateCookInput) {
    return this.cooksService.create(args)
  }

  @Query(() => [Cook], { name: 'cooks' })
  findAll(@Args() args: FindManyCookArgs) {
    return this.cooksService.findAll(args)
  }

  @Query(() => Cook, { name: 'cook' })
  findOne(@Args() args: FindUniqueCookArgs) {
    return this.cooksService.findOne(args)
  }

  @Mutation(() => Cook)
  updateCook(@Args('updateCookInput') args: UpdateCookInput) {
    return this.cooksService.update(args)
  }

  @Mutation(() => Cook)
  removeCook(@Args() args: FindUniqueCookArgs) {
    return this.cooksService.remove(args)
  }
}
