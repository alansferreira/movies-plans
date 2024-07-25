import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty() username: string;
  @ApiProperty() @IsStrongPassword() password: string;
  @ApiProperty() @IsEmail() email: string;
}
