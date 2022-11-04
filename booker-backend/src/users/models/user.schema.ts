/* eslint-disable prettier/prettier */
import { AbstractDocument } from './../../database/abstract.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
