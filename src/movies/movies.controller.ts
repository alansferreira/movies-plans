import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { MovieResultDto } from 'src/themoviedb/dto/movie-result.dto';
import { PageableResults } from 'src/themoviedb/dto/pageable.dto';
import { ThemoviedbService } from 'src/themoviedb/themoviedb.service';
import { User } from 'src/users/users.decorator';
import { JWtDataDto } from 'src/auth/dto/jwt-data.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private themoviedbService: ThemoviedbService,
    private prismaService: PrismaService,
    private subscriptionService: SubscriptionService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page_number' })
  @ApiOperation({
    summary: 'List user Movies from current user Subscriptions.',
  })
  async list(@Query() query, @User() user: JWtDataDto) {
    const { page_number } = {
      page_number: 1,
      ...query,
    } as any;

    const genres_ids = await this.subscriptionService.genresByUser(
      user.user_id,
    );

    const emptyResult = {
      results: [],
      total_pages: 0,
      total_results: 0,
    } as unknown as PageableResults<MovieResultDto>;

    if (!genres_ids.length) return emptyResult;

    const movies = await this.themoviedbService.movies(
      Array.from(genres_ids.values()),
      page_number,
    );

    return movies.data || emptyResult;
  }
}
