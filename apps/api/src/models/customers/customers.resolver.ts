import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  AllowAuthenticated,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { checkRowLevelPermission } from 'src/common/guards'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GetUserType } from 'src/common/types'
import { Address } from '../addresses/entities/address.entity'
import { CustomerReview } from '../customer-reviews/entities/customer-review.entity'
import { Order } from '../orders/entities/order.entity'
import { Schedule } from '../schedules/entities/schedule.entity'
import { CustomersService } from './customers.service'
import { CreateCustomerInput } from './dto/create-customer.input'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dto/find.args'
import { UpdateCustomerInput } from './dto/update-customer.input'
import { Customer } from './entities/customer.entity'

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') args: CreateCustomerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.customersService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Customer], { name: 'customers' })
  findAll(@Args() args: FindManyCustomerArgs) {
    return this.customersService.findAll(args)
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.findOne(args)
  }
  @AllowAuthenticated()
  @Query(() => Customer, { name: 'customerMe' })
  customerMe(@GetUser() user: GetUserType) {
    return this.customersService.findOne({ where: { uid: user.uid } })
  }

  @AllowAuthenticated()
  @Mutation(() => Customer)
  updateCustomer(
    @Args('updateCustomerInput') args: UpdateCustomerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.customersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Customer)
  removeCustomer(
    @Args() args: FindUniqueCustomerArgs,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.where.uid)

    return this.customersService.remove(args)
  }

  @AllowAuthenticated()
  @ResolveField(() => [Schedule])
  schedules(@Parent() customer: Customer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, customer.uid)

    return this.prisma.schedule.findMany({
      where: { customerId: customer.uid },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => Address, { nullable: true })
  address(@Parent() customer: Customer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, customer.uid)

    return this.prisma.address.findUnique({
      where: { id: customer.addressId },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => [CustomerReview])
  customerReviews(@Parent() customer: Customer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, customer.uid)

    return this.prisma.customerReview.findMany({
      where: { customerId: customer.uid },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => [Order])
  orders(@Parent() customer: Customer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, customer.uid)

    return this.prisma.order.findMany({
      where: { customerId: customer.uid },
    })
  }
}
