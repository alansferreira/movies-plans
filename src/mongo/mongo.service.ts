import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Genre } from './schemas/genre.schema';
import { Watched } from './schemas/watched.schema';

@Injectable()
export class MongoService {
  constructor(
    @InjectModel(User.name) readonly user: Model<User>,
    @InjectModel(Genre.name) readonly genre: Model<Genre>,
    @InjectModel(Watched.name) readonly watched: Model<Watched>,
  ) {}
}
