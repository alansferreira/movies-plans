import { ApiProperty } from '@nestjs/swagger';

export class RecoverDto {
  @ApiProperty() readonly username: string;
}
