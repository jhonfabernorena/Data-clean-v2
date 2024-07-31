import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dtos/create-log.dto';
import { UpdateLogDto } from './dtos/update-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(@Body() createLogDto: CreateLogDto): Promise<void> {
    await this.logsService.create(createLogDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.logsService.findOne(id);
  }
}
