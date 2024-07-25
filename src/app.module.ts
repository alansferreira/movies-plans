import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './mongo/mongo.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongoModule, UsersModule, AuthModule, PrismaClientModule],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private jwtService: JwtService) {}
  async onModuleInit() {
    const payload = { sub: '123', username: 'admin' };
    const access_token = await this.jwtService.signAsync(payload);

    Logger.warn(`Admin Token: ${access_token}`);
  }
}
