import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { ThemoviedbModule } from 'src/themoviedb/themoviedb.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [ThemoviedbModule, PrismaClientModule, SubscriptionModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
