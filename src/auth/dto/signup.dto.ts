import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty() userId: string;
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}
