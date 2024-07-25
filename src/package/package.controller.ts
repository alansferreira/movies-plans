import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Controller('package')
export class PackageController {
  constructor(private prismaService: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async create(@Body() newPackage: CreatePackageDto) {
    await this.prismaService.package.create({ data: newPackage });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:package_name/genre')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'package_name' })
  async addGenre(
    @Param() { package_name }: { package_name: string },
    @Body() genres: string[],
  ) {
    await this.prismaService.packageGenre.createMany({
      data: genres.map((genre_name) => {
        return {
          genre_name,
          package_name,
        };
      }),
    });
  }
}
