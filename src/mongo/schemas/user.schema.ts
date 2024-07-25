import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'userId' }) userId: string;
  @Prop() username: string;
  @Prop() password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
