import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GenresModule } from './genres/genres.module';
import { GenresService } from './genres/genres.service';
import { MongoModule } from './mongo/mongo.module';
import { MongoService } from './mongo/mongo.service';
import { MoviesModule } from './movies/movies.module';
import { PlanController } from './plans/plans.controller';
import { PlanModule } from './plans/plans.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { ThemoviedbModule } from './themoviedb/themoviedb.module';
import { UsersModule } from './users/users.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { WatchedModule } from './watched/watched.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongoModule,
    PrismaClientModule,

    ThemoviedbModule,
    UsersModule,
    AuthModule,
    PlanModule,
    GenresModule,
    MoviesModule,
    SubscriptionModule,
    WatchedModule,
  ],
  controllers: [AppController, PlanController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private authService: AuthService,
    private genreService: GenresService,
    private mongoService: MongoService,
  ) {}
  async onModuleInit() {
    const { access_token } = await this.authService.sign({
      username: 'admin',
      user_id: '0',
    });

    Logger.warn(`Admin Token: ${access_token}`);

    // Parte 3 - Serviço Externo - Temas (Genre)
    //  Ao iniciar à aplicação é necessário ver se existe uma lista de temas já armazenada no banco,
    // se não iniciar uma rotina que a cada 2 horas verifique os temas disponíveis no sistema externo
    // e atualize eles se necessário
    try {
      const result = await this.mongoService.genre.findOne({}).exec();
      if (result) return;

      await this.genreService.sync();
    } catch (error) {
      Logger.error(error.reponse?.data || error);
    }
  }
}
