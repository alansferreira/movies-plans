import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from 'src/mongo/mongo.module';
import { MongoService } from 'src/mongo/mongo.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongoModule,
    PrismaClientModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '24h' },
    }),
  ],
  providers: [AuthService, PrismaService, MongoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
