import { Module } from '@nestjs/common';
import { PlanController } from './plans.controller';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongoModule, PrismaClientModule],
  controllers: [PlanController],
  providers: [],
})
export class PlanModule {}
