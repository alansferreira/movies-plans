import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MongoService } from 'src/mongo/mongo.service';
import { GenreDto } from './dto/genre.dto';
import { DEFAULT_PAGE_SIZE, PaginationType } from 'src/utils/dto/pageable.dto';
import { FilterQuery } from 'mongoose';
import { Genre } from 'src/mongo/schemas/genre.schema';
import { GenreQueryDto } from './dto/genre-query.dto';

@ApiTags('Movies')
@Controller('genres')
export class GenresController {
  constructor(private mongoService: MongoService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiOperation({
    summary: 'List user Genres from current user Subscriptions.',
  })
  @ApiBearerAuth()
  @ApiQuery({ name: 'pageNumber', required: false, type: 'number' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
  async list(
    @Query()
    query: Partial<GenreQueryDto>,
  ): Promise<PaginationType<GenreDto>> {
    const {
      pageNumber: pnum,
      pageSize: psize,
      name,
    } = {
      pageNumber: 0,
      pageSize: DEFAULT_PAGE_SIZE,
      ...query,
    };

    const pageNumber = Number(pnum);
    const pageSize = Number(psize);

    const filter: FilterQuery<Genre> = {
      name: { $regex: `.*${name || ''}.*` },
    };

    const totalDocuments = await this.mongoService.genre
      .countDocuments(filter)
      .exec();

    const result = await this.mongoService.genre
      .find(filter, undefined, { limit: pageSize, skip: pageNumber * pageSize })
      .exec();

    const totalPages = Math.floor(totalDocuments / pageSize);
    return {
      pagination: {
        firstPage: pageNumber == 0,
        lastPage: pageNumber == totalPages,
        pageNumber: pageNumber + 1,
        totalPages,
        pageSize,
      },
      data: result.map(({ id, name }) => {
        return {
          id,
          name,
        };
      }),
    };
  }
}
