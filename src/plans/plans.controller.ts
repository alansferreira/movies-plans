import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private prismaService: PrismaService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  async list() {
    await this.prismaService.plan.findMany({});
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async create(@Body() newPlan: CreatePlanDto) {
    await this.prismaService.plan.create({ data: newPlan });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:plan_name/genre')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'plan_name' })
  async addGenre(
    @Param() { plan_name }: { plan_name: string },
    @Body() genres: string[],
  ) {
    await this.prismaService.planGenre.createMany({
      data: genres.map((genre_name) => {
        return {
          genre_name,
          plan_name,
        };
      }),
    });
  }
}
