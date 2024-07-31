import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { CreateFileDto } from '../file-processing/dtos/create-file.dto';

@Injectable()
export class PersistenceService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const createdFile = new this.fileModel(createFileDto);
    return createdFile.save();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileModel.findById(id).exec();
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileDto: any): Promise<File> {
    const updatedFile = await this.fileModel.findByIdAndUpdate(id, updateFileDto, { new: true }).exec();
    if (!updatedFile) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return updatedFile;
  }

  async remove(id: string): Promise<File> {
    const deletedFile = await this.fileModel.findByIdAndDelete(id).exec();
    if (!deletedFile) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return deletedFile;
  }
}
