import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { CreateLogDto } from './dtos/create-log.dto';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(createLogDto: CreateLogDto): Promise<void> {
    const newLog = new this.logModel(createLogDto);
    await newLog.save();
  }

  async findOne(id: string): Promise<Log> {
    const log = await this.logModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException(`Log with id ${id} not found`);
    }
    return log;
  }
}
