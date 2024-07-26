import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class WatchMovieDto {
  @ApiProperty() @IsNumberString() movie_id: number;
}
