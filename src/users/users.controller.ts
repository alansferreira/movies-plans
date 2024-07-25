import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
  signIn(@Body() newUser: CreateUserDto) {
    return this.prismaService.user.create({ data: newUser });
  }
}
