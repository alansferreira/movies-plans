import { Module } from '@nestjs/common';
import { MongooseService } from './mongo.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NestMongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'moviesdb',
    }),
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongooseService],
  exports: [MongooseService, NestMongooseModule],
})
export class MongoModule {}
