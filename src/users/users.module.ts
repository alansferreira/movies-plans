import { Module } from '@nestjs/common';
import { MongoModule } from 'src/mongo/mongo.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [MongoModule, PrismaClientModule],
})
export class UsersModule {}
