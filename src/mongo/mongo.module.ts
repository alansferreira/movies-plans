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
import { Watched, WatchedSchema } from './schemas/watched.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestMongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'moviesdb',
    }),
    NestMongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Watched.name, schema: WatchedSchema },
    ]),
  ],
  providers: [MongoService],
  exports: [MongoService, NestMongooseModule],
})
export class MongoModule implements OnModuleInit {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @InjectModel(User.name) readonly user: Model<User>,
    @InjectModel(Genre.name) readonly genre: Model<Genre>,
    @InjectModel(Watched.name) readonly watched: Model<Watched>,
  ) {}
  async onModuleInit() {
    await this.connection.syncIndexes();
  }
}
