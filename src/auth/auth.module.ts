import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { MongoService } from 'src/mongo/mongo.service';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { MongoModule } from 'src/mongo/mongo.module';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [
    MongoModule,
    PrismaClientModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '24h' },
    }),
  ],
  providers: [AuthService, PrismaService, MongoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
