import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  timestamp: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
