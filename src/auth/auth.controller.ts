import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { randomUUID } from 'crypto';
import { RecoverDto } from './dto/recover.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('recover')
  async recover(@Body() { username }: RecoverDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) throw new NotFoundException();
    const recoverCode = randomUUID();

    Logger.warn(`Recover link: ${username}: ${recoverCode}`);

    await this.prismaService.user.update({
      data: { recoverCode },
      where: { username },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('updatePassword')
  async updatePassword(
    @Body()
    { recoverCode, password }: UpdatePasswordDto,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { recoverCode },
    });

    if (!user) throw new NotFoundException();

    await this.prismaService.user.update({
      data: { password, recoverCode: null },
      where: { username: user.username },
    });

    return 'ok!';
  }
}
