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
    const recover_code = randomUUID();

    Logger.warn(`Recover link: ${username}: ${recover_code}`);

    await this.prismaService.user.update({
      data: { recover_code },
      where: { username },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('updatePassword')
  async updatePassword(
    @Body()
    { recover_code, password }: UpdatePasswordDto,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { recover_code },
    });

    if (!user) throw new NotFoundException();

    await this.prismaService.user.update({
      data: { password, recover_code: null },
      where: { username: user.username },
    });

    return 'ok!';
  }
}
