import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { AddressesService } from './addresses.service'
import { Address } from './entities/address.entity'
import { FindManyAddressArgs, FindUniqueAddressArgs } from './dto/find.args'
import { CreateAddressInput } from './dto/create-address.input'
import { UpdateAddressInput } from './dto/update-address.input'
import { Customer } from '../customers/entities/customer.entity'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from '@home-chefs-org/types'
import { Kitchen } from '../kitchens/entities/kitchen.entity'

@Resolver(() => Address)
export class AddressesResolver {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Address)
  createAddress(
    @Args('createAddressInput') args: CreateAddressInput,
    @GetUser() user: GetUserType,
  ) {
    //   checkRowLevelPermission(user, args.)
    return this.addressesService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Address], { name: 'addresses' })
  findAll(@Args() args: FindManyAddressArgs) {
    return this.addressesService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => Address, { name: 'address' })
  findOne(@Args() args: FindUniqueAddressArgs) {
    return this.addressesService.findOne(args)
  }

  @Mutation(() => Address)
  updateAddress(@Args('updateAddressInput') args: UpdateAddressInput) {
    return this.addressesService.update(args)
  }

  @Mutation(() => Address)
  removeAddress(@Args() args: FindUniqueAddressArgs) {
    return this.addressesService.remove(args)
  }

  @ResolveField(() => Customer, { nullable: true })
  customer(@Parent() address: Address) {
    return this.prisma.customer.findUnique({
      where: { addressId: address.id },
    })
  }

  @ResolveField(() => Kitchen, { nullable: true })
  kitchen(@Parent() address: Address) {
    return this.prisma.kitchen.findUnique({
      where: { id: address.kitchenId },
    })
  }
}
