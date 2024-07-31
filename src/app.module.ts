import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileProcessingModule } from './modules/file-processing/file-processing.module';
import { LogsModule } from './modules/logs/logs.module';
import { PersistenceModule } from './modules/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de que ConfigModule esté importado
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule aquí
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    FileProcessingModule,
    LogsModule,
    PersistenceModule,
  ],
  providers: [],
})
export class AppModule {}
