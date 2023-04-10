import { Injectable } from '@nestjs/common'
import { FindManyFoodItemArgs, FindUniqueFoodItemArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateFoodItemInput } from './dto/create-food-item.input'
import { UpdateFoodItemInput } from './dto/update-food-item.input'

@Injectable()
export class FoodItemsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFoodItemInput: CreateFoodItemInput) {
    return this.prisma.foodItem.create({
      data: createFoodItemInput,
    })
  }

  findAll(args: FindManyFoodItemArgs) {
    return this.prisma.foodItem.findMany(args)
  }

  findOne(args: FindUniqueFoodItemArgs) {
    return this.prisma.foodItem.findUnique(args)
  }

  update(updateFoodItemInput: UpdateFoodItemInput) {
    const { id, ...data } = updateFoodItemInput
    return this.prisma.foodItem.update({
      where: { id: id },
      data: data,
    })
  }

  remove(args: FindUniqueFoodItemArgs) {
    return this.prisma.foodItem.delete(args)
  }
}
