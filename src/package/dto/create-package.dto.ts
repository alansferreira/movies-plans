import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiProperty() name: string;
  @ApiProperty() version: string;
}
