import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Genres } from './dto/genres.dto';

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
}
