import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileProcessingService } from './file-processing.service';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/file-options.dto';

@ApiTags('File Processing')
@Controller('files')
export class FileProcessingController {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload and process a CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File and options for processing',
    type: CreateFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async processFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { options: { removeDuplicates: boolean; sortColumn: string; sortOrder: string } },
  ): Promise<{ filePath: string }> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    
    const { options } = body;
    
    if (!options) {
      throw new HttpException('Options are required', HttpStatus.BAD_REQUEST);
    }
    
    try {
      const filePath = await this.fileProcessingService.processFile({
        file,
        options
      });
      return { filePath };
    } catch (error) {
      throw new HttpException(`Error processing file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('file/:filename')
  @ApiOperation({ summary: 'Get the CSV file' })
  @ApiParam({ name: 'filename', type: String, description: 'Name of the file to retrieve' })
  async getFile(@Param('filename') filename: string): Promise<any> {
    try {
      const file = await this.fileProcessingService.getFile(filename);
      if (!file) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
      return file;
    } catch (error) {
      throw new HttpException(`Error retrieving file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('file/:filename')
  @ApiOperation({ summary: 'Delete a CSV file' })
  @ApiParam({ name: 'filename', type: String, description: 'Name of the file to delete' })
  async deleteFile(@Param('filename') filename: string): Promise<void> {
    try {
      await this.fileProcessingService.deleteFile(filename);
    } catch (error) {
      throw new HttpException(`Error deleting file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
