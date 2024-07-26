import {
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
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
import { JWtDataDto } from 'src/auth/dto/jwt-data.dto';
import { UserGuard } from 'src/auth/user.guard';
import { MongoService } from 'src/mongo/mongo.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { User } from 'src/users/users.decorator';

@ApiTags('Billing')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private mongoService: MongoService,
    private prismaService: PrismaService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('subscribe/:plan_name')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Subscribe to a Plan' })
  @ApiBearerAuth()
  @ApiParam({ name: 'plan_name' })
  async create(
    @Param() { plan_name }: { plan_name },
    @User() user: JWtDataDto,
  ) {
    // const user = await this.prismaService.user.findFirst({
    //   where: { username: req['username'] },
    // });
    const plan = await this.prismaService.plan.findFirst({
      where: { name: plan_name },
    });

    if (!plan) throw new NotFoundException('Plan not founded!');

    await this.prismaService.subscription.create({
      data: { plan_id: plan.id, user_id: user.user_id },
    });
  }
}
