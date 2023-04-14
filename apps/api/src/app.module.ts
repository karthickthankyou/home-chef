import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './common/prisma/prisma.module'
import { CooksModule } from './models/cooks/cooks.module'
import { KitchensModule } from './models/kitchens/kitchens.module'
import { FoodItemsModule } from './models/food-items/food-items.module'
import { CustomersModule } from './models/customers/customers.module'
import { SchedulesModule } from './models/schedules/schedules.module'
import { OrdersModule } from './models/orders/orders.module'
import { AddressesModule } from './models/addresses/addresses.module'
import { CustomerReviewsModule } from './models/customer-reviews/customer-reviews.module'
import { FirebaseModule } from './common/firebase/firebase.module'
import { AuthModule } from './common/auth/auth.module'
import { SchedulerModule } from './scheduler/scheduler.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
    ScheduleModule.forRoot(),

    PrismaModule,
    FirebaseModule,
    AuthModule,
    SchedulerModule,

    CooksModule,
    KitchensModule,
    FoodItemsModule,
    CustomersModule,
    SchedulesModule,
    OrdersModule,
    AddressesModule,
    CustomerReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
