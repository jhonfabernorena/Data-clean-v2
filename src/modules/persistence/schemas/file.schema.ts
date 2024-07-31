import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ required: true })
  contentType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  uploadDate: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
