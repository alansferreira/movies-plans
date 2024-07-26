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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { MongoService } from 'src/mongo/mongo.service';

@ApiTags('Billing')
@Controller('plan')
export class PlanController {
  constructor(
    private mongoService: MongoService,
    private prismaService: PrismaService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiOperation({ summary: 'List all Plans' })
  // @UseGuards(AdminGuard)
  // @ApiBearerAuth()
  async list() {
    return this.prismaService.plan.findMany({});
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a Plan' })
  @ApiBearerAuth()
  async create(@Body() newPlan: CreatePlanDto) {
    await this.prismaService.plan.create({ data: newPlan });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:plan_name/genre')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add an Genre to a Plan' })
  @ApiParam({ name: 'plan_name' })
  async addGenre(
    @Param() { plan_name }: { plan_name: string },
    @Body() genres_names: string[],
  ) {
    const plan = await this.prismaService.plan.findFirst({
      where: { name: plan_name },
      select: { id: true },
    });
    const genres = await this.mongoService.genre.find({
      name: { $in: genres_names },
    });

    await this.prismaService.planGenre.createMany({
      data: genres.map((genre) => {
        return {
          genre_id: genre.id,
          plan_id: plan.id,
        };
      }),
    });
  }
}
