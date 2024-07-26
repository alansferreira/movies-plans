import { Test, TestingModule } from '@nestjs/testing';
import { MongoService } from './mongo.service';
import { ConfigModule } from '@nestjs/config';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Watched, WatchedSchema } from './schemas/watched.schema';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

describe('MongooseService', () => {
  let service: MongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<MongoService>(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
