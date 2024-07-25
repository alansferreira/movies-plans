import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty() readonly recoverCode: string;
  @ApiProperty() readonly password: string;
}
