import { Module } from '@nestjs/common';
import { MongoModule } from 'src/mongo/mongo.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { UsersController } from './users.controller';

@Module({
  imports: [MongoModule, PrismaClientModule],
  controllers: [UsersController],
  // controllers: [UsersController],
})
export class UsersModule {}
