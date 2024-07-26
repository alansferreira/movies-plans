import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { AuthService } from './auth.service';
import { RecoverDto } from './dto/recover.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Security')
@Controller('auth')
export class AuthController {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Get token from credentials username + password.' })
  signIn(@Body() creds: SignInDto) {
    return this.authService.signIn(creds.username, creds.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('recover')
  @ApiOperation({ summary: 'Get an recovery code to make new password.' })
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
  @ApiOperation({ summary: 'Recover password from an recovery code.' })
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

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register new User' })
  async signUp(@Body() newUser: SignUpDto) {
    try {
      await this.prismaService.user.create({ data: newUser });
    } catch (error) {
      Logger.error(error);
    }
  }
}
