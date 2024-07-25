import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminGuard } from '../auth/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prismaService: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  signUp(@Body() newUser: CreateUserDto) {
    try {
      return this.prismaService.user.create({ data: newUser });
    } catch (error) {
      Logger.error(error);
    }
  }
}
