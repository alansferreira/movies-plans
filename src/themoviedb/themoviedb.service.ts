import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Genres } from './dto/genres.dto';
import { MovieResultDto } from './dto/movie-result.dto';
import { PageableResults } from './dto/pageable-results.dto';

@Injectable()
export class ThemoviedbService {
  private headers = {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.THEMOVIEDB_APIKEY}`,
  };

  async genresOfMovies() {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
      headers: {
        ...this.headers,
      },
    };
    return await axios.request<Genres>(options);
  }

  async movies(genres_ids: number[], page: number) {
    const url = new URL(
      [
        'https://api.themoviedb.org/3/discover/movie',
        '?include_adult=false',
        '&include_video=false',
        '&language=en-US',
        `&page=${page}`,
        '&sort_by=popularity.desc',
      ].join(''),
    );

    url.searchParams.append('with_genres', genres_ids.join(','));

    return await axios.request<PageableResults<MovieResultDto>>({
      method: 'GET',
      url: url.toString(),
      headers: {
        ...this.headers,
      },
    });
  }
}
