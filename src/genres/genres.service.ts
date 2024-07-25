import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MongoService } from 'src/mongo/mongo.service';
import { ThemoviedbService } from 'src/themoviedb/themoviedb.service';

@Injectable()
export class GenresService {
  constructor(
    private mongoService: MongoService,
    private themoviedbService: ThemoviedbService,
  ) {}

  @Cron('* * 2 * * *')
  async sync() {
    // Parte 3 - Serviço Externo - Temas (Genre)
    //  Ao iniciar à aplicação é necessário ver se existe uma lista de temas já armazenada no banco,
    // se não iniciar uma rotina que a cada 2 horas verifique os temas disponíveis no sistema externo
    // e atualize eles se necessário

    // const result = await this.mongoService.genre.findOne({}).exec();
    // if (result) return;

    const {
      data: { genres },
    } = await this.themoviedbService.genresOfMovies();

    await this.mongoService.genre.insertMany(genres);
  }
}
