import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MovieDetailDto } from 'src/themoviedb/dto/movie-detail.dto';

export type WatchedDocument = HydratedDocument<Watched>;

@Schema()
export class Watched {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'watchedId' })
  watchedId: string;
  @Prop() user_id: string;
  @Prop() movie_id: string;
  @Prop() genre_id: string;
  @Prop() genre_name: string;
  @Prop({ type: 'object' }) movie_detail: MovieDetailDto;
}

export const WatchedSchema = SchemaFactory.createForClass(Watched);
