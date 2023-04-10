import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CustomersService } from './customers.service'
import { Customer } from './entities/customer.entity'
import { FindManyCustomerArgs, FindUniqueCustomerArgs } from './dto/find.args'
import { CreateCustomerInput } from './dto/create-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation(() => Customer)
  createCustomer(@Args('createCustomerInput') args: CreateCustomerInput) {
    return this.customersService.create(args)
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll(@Args() args: FindManyCustomerArgs) {
    return this.customersService.findAll(args)
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.findOne(args)
  }

  @Mutation(() => Customer)
  updateCustomer(@Args('updateCustomerInput') args: UpdateCustomerInput) {
    return this.customersService.update(args)
  }

  @Mutation(() => Customer)
  removeCustomer(@Args() args: FindUniqueCustomerArgs) {
    return this.customersService.remove(args)
  }
}
