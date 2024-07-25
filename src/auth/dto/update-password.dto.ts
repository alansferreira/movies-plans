import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty() readonly recover_code: string;
  @ApiProperty() readonly password: string;
}
