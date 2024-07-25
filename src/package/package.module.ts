import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { MongoModule } from 'src/mongo/mongo.module';

@Module({
  imports: [MongoModule, PrismaClientModule],
  controllers: [PackageController],
})
export class PackageModule {}
