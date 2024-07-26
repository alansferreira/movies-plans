import { Module } from '@nestjs/common';
import { WatchedController } from './watched.controller';
import { MongoModule } from 'src/mongo/mongo.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { ThemoviedbModule } from 'src/themoviedb/themoviedb.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [
    MongoModule,
    PrismaClientModule,
    ThemoviedbModule,
    SubscriptionModule,
  ],
  controllers: [WatchedController],
})
export class WatchedModule {}
