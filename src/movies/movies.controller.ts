import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/user.guard';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { MovieResultDto } from 'src/themoviedb/dto/movie-result.dto';
import { PageableResults } from 'src/themoviedb/dto/pageable-results.dto';
import { ThemoviedbService } from 'src/themoviedb/themoviedb.service';
import { ListMoviesDto } from './dto/list-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private themoviedbService: ThemoviedbService,
    private prismaService: PrismaService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'pageNumber' })
  async list(@Param() params: ListMoviesDto, @Request() req: Request) {
    const { pageNumber } = {
      pageNumber: 1,
      ...params,
    };

    const user = await this.prismaService.user.findFirst({
      where: { username: req['username'] },
    });
    const subs = await this.prismaService.subscription.findMany({
      where: { user_id: user.id },
      select: { plan: true, user: true },
    });

    const plans_ids = subs.map(({ plan }) => plan.id);

    const genres = await this.prismaService.planGenre.findMany({
      where: { id: { in: plans_ids } },
    });
    const genres_ids = genres
      .map(({ genre_id }) => genre_id)
      .reduce((p, c) => {
        p.add(c);
        return p;
      }, new Set<number>());

    if (!genres_ids.size) {
      return {
        results: [],
        total_pages: 0,
        total_results: 0,
      } as unknown as PageableResults<MovieResultDto>;
    }

    return this.themoviedbService.movies(
      Array.from(genres_ids.values()),
      pageNumber,
    );
  }
}
