import { ApiProperty } from '@nestjs/swagger';

export class ListMoviesDto {
  @ApiProperty() readonly pageNumber: number;
}
