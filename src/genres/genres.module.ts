import { Module } from '@nestjs/common';
import { MongoModule } from 'src/mongo/mongo.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { ThemoviedbModule } from 'src/themoviedb/themoviedb.module';

@Module({
  imports: [MongoModule, PrismaClientModule, ThemoviedbModule],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresService],
})
export class GenresModule {}
