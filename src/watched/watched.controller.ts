import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
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
import { UserGuard } from 'src/auth/user.guard';
import { MongoService } from 'src/mongo/mongo.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { ThemoviedbService } from 'src/themoviedb/themoviedb.service';
import { WatchMovieDto } from './dto/watch-movie.dto';
import { User } from 'src/users/users.decorator';
import { JWtDataDto } from 'src/auth/dto/jwt-data.dto';
import { UnWatchMovieDto } from './dto/unwatch-movie.dto';

@Controller('watched')
export class WatchedController {
  constructor(
    private mongoService: MongoService,
    private prismaService: PrismaService,
    private themoviedbService: ThemoviedbService,
    private subscriptionService: SubscriptionService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('watch/:movie_id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Mark an wathed movie' })
  @ApiBearerAuth()
  @ApiParam({ name: 'movie_id' })
  @ApiTags('Movies')
  async watch(@Param() { movie_id }: WatchMovieDto, @User() user: JWtDataDto) {
    const movie = await this.themoviedbService.movie(movie_id);
    if (!movie.data?.id) throw new NotFoundException('Movie does not exists!');
    const genres_ids = await this.subscriptionService.genresByUser(
      user.user_id,
    );
    const genresmatch = movie.data.genres.filter(
      (g) => genres_ids.indexOf(g.id) !== -1,
    );

    if (genresmatch.length === 0)
      throw new ForbiddenException('You not subscribe for this movie genres!');

    await this.mongoService.watched.create(
      genresmatch.map((g) => {
        return {
          user_id: user.user_id,
          genre_id: g.id,
          genre_name: g.name,
          movie_id,
          movie_detail: movie.data,
        };
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('watched')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'See watched movies.' })
  @ApiBearerAuth()
  @ApiTags('Movies')
  async watched(@User() user: JWtDataDto) {
    return this.mongoService.watched
      .find({ user_id: user.user_id })
      .limit(100)
      .exec();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('unwatch/:movie_id')
  @UseGuards(UserGuard)
  @ApiParam({ name: 'movie_id' })
  @ApiOperation({ summary: '🫣 Unwatch a movie.' })
  @ApiBearerAuth()
  @ApiTags('Movies')
  async unwatched(
    @Param() { movie_id }: UnWatchMovieDto,
    @User() user: JWtDataDto,
  ) {
    await this.mongoService.watched
      .deleteMany({ user_id: user.user_id, movie_id })
      .exec();
  }
}
