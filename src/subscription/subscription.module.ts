import { Module } from '@nestjs/common';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { SubscriptionController } from './subscription.controller';
import { MongoModule } from 'src/mongo/mongo.module';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [PrismaClientModule, MongoModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
