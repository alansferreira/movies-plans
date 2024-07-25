import { Module } from '@nestjs/common';
import { ThemoviedbService } from './themoviedb.service';

@Module({
  imports: [],
  providers: [ThemoviedbService],
  exports: [ThemoviedbService],
})
export class ThemoviedbModule {}
