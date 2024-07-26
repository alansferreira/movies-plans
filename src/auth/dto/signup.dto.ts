import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @ApiProperty() username: string;
  @ApiProperty() @IsStrongPassword() password: string;
  @ApiProperty() @IsEmail() email: string;
}
