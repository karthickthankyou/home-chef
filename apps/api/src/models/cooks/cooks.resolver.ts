import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CooksService } from './cooks.service'
import { CreateCookInput } from './dto/create-cook.input'
import { FindManyCookArgs, FindUniqueCookArgs } from './dto/find.args'
import { Cook } from './entities/cook.entity'

import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/guards'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { Kitchen } from '../kitchens/entities/kitchen.entity'

@Resolver(() => Cook)
export class CooksResolver {
  constructor(
    private readonly cooksService: CooksService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Cook)
  createCook(
    @Args('createCookInput') args: CreateCookInput,
    @GetUser() user: GetUserType,
  ) {
    console.log('user', user)
    checkRowLevelPermission(user, args.uid)
    return this.cooksService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Cook], { name: 'cooks' })
  findAll(@Args() args: FindManyCookArgs) {
    return this.cooksService.findAll(args)
  }

  @Query(() => Cook, { name: 'cook' })
  findOne(@Args() args: FindUniqueCookArgs) {
    return this.cooksService.findOne(args)
  }

  @AllowAuthenticated()
  @Query(() => Cook, { name: 'cookMe' })
  cookMe(@GetUser() user: GetUserType) {
    return this.cooksService.findOne({ where: { uid: user.uid } })
  }

  @AllowAuthenticated()
  @Mutation(() => Cook)
  removeCook(@Args() args: FindUniqueCookArgs, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.where.uid)
    return this.cooksService.remove(args)
  }

  @AllowAuthenticated()
  @ResolveField(() => Kitchen, { nullable: true })
  kitchen(@Parent() cook: Cook, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, cook.uid)
    return this.prisma.kitchen.findUnique({
      where: { cookId: cook.uid },
    })
  }
}
