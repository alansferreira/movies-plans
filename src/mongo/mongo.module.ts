import { Module, OnModuleInit } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { User, UserSchema } from './schemas/user.schema';
import {
  InjectConnection,
  InjectModel,
  MongooseModule as NestMongooseModule,
} from '@nestjs/mongoose';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { Connection, Model } from 'mongoose';

@Module({
  imports: [
    NestMongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      dbName: 'moviesdb',
    }),
    NestMongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
  ],
  providers: [MongoService],
  exports: [MongoService, NestMongooseModule],
})
export class MongoModule implements OnModuleInit {
  mongoose: any;
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(User.name) readonly user: Model<User>,
    @InjectModel(Genre.name) readonly genre: Model<Genre>,
  ) {}
  async onModuleInit() {
    await this.connection.syncIndexes();
  }
}
