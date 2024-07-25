import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'genreId' })
  genreId: string;
  @Prop() id: number;
  @Prop() name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);

GenreSchema.clearIndexes();
GenreSchema.index({ name: 'asc' }, { unique: true });
