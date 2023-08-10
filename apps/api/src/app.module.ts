import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './common/auth/auth.module'
import { FirebaseModule } from './common/firebase/firebase.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { AddressesModule } from './models/addresses/addresses.module'
import { CooksModule } from './models/cooks/cooks.module'
import { CustomerReviewsModule } from './models/customer-reviews/customer-reviews.module'
import { CustomersModule } from './models/customers/customers.module'
import { FoodItemsModule } from './models/food-items/food-items.module'
import { KitchensModule } from './models/kitchens/kitchens.module'
import { OrdersModule } from './models/orders/orders.module'
import { SchedulesModule } from './models/schedules/schedules.module'
import { SchedulerModule } from './scheduler/scheduler.module'

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
      introspection: true,
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
