import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { KitchensService } from './kitchens.service'
import { Kitchen } from './entities/kitchen.entity'
import { FindManyKitchenArgs, FindUniqueKitchenArgs } from './dto/find.args'
import { CreateKitchenInput } from './dto/create-kitchen.input'
import { UpdateKitchenInput } from './dto/update-kitchen.input'
import { Cook } from '../cooks/entities/cook.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Address } from '../addresses/entities/address.entity'
import { FoodItem } from '../food-items/entities/food-item.entity'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@common-kitchen-org/types'
import { checkRowLevelPermission } from 'src/common/guards'

@Resolver(() => Kitchen)
export class KitchensResolver {
  constructor(
    private readonly kitchensService: KitchensService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Kitchen)
  createKitchen(
    @Args('createKitchenInput') args: CreateKitchenInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.cookId)
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

  @AllowAuthenticated()
  @Mutation(() => Kitchen)
  updateKitchen(
    @Args('updateKitchenInput') args: UpdateKitchenInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.cookId)
    return this.kitchensService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Kitchen)
  async removeKitchen(
    @Args() args: FindUniqueKitchenArgs,
    @GetUser() user: GetUserType,
  ) {
    const kitchen = await this.kitchensService.findOne(args)
    checkRowLevelPermission(user, kitchen.cookId)

    return this.kitchensService.remove(args)
  }

  @ResolveField(() => Cook)
  cook(@Parent() kitchen: Kitchen) {
    return this.prisma.cook.findUnique({
      where: { uid: kitchen.cookId },
    })
  }
  @ResolveField(() => Address)
  address(@Parent() kitchen: Kitchen) {
    return this.prisma.address.findUnique({
      where: { id: kitchen.addressId },
    })
  }
  @ResolveField(() => [FoodItem])
  foodItems(@Parent() kitchen: Kitchen) {
    return this.prisma.foodItem.findMany({
      where: { id: kitchen.addressId },
    })
  }
}
