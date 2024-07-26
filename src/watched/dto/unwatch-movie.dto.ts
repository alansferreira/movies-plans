import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class UnWatchMovieDto {
  @ApiProperty() @IsNumberString() movie_id: number;
}
