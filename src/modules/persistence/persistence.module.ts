import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FileSchema } from './schemas/file.schema';

@Module({
  imports: [
    ConfigModule, // Importa ConfigModule aquí también
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class PersistenceModule {}
