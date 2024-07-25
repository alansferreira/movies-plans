import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './mongo/mongo.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { PlanController } from './plans/plans.controller';
import { PlanModule } from './plans/plans.module';
import { ThemoviedbModule } from './themoviedb/themoviedb.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GenresService } from './genres/genres.service';
import { MongoService } from './mongo/mongo.service';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongoModule,
    PrismaClientModule,

    ThemoviedbModule,
    UsersModule,
    AuthModule,
    PlanModule,
    GenresModule,
  ],
  controllers: [AppController, PlanController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    private genreService: GenresService,
    private mongoService: MongoService,
  ) {}
  async onModuleInit() {
    const payload = { sub: '123', username: 'admin' };
    const access_token = await this.jwtService.signAsync(payload);

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
