import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { boolean } from 'joi';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { TimeSlotsService } from './timeSlots.service';
import { TimeSlotDTO } from './dto/timeSlot.dto';
import { TimeSlotEntity } from './entities/timeSlots.entity';

@ApiBearerAuth()
@ApiTags('timeSlots')
@Controller('timeSlots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  //List all timeSlot
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL TIME SLOT',
    type: [TimeSlotDTO],
  })
  // @UseInterceptors(MapInterceptor(TimeSlotEntity, TimeSlotDTO))
  async findAll(): Promise<TimeSlotEntity[] | string> {
    const listTimeSlots = await this.timeSlotsService.getAllTimeSlot();
    if (!listTimeSlots || listTimeSlots.length == 0) {
      throw new HttpException('No data time slot', HttpStatus.NOT_FOUND);
    }
    return listTimeSlots;
  }

  //List time slot follow flag
  @Public()
  @Get('/:flag')
  @ApiResponse({
    status: 200,
    description: 'GET ALL TIME SLOT FOLLOW FLAG',
    type: [TimeSlotDTO],
  })
  // @UseInterceptors(MapInterceptor(TimeSlotEntity, TimeSlotDTO))
  async getTimeSlotFlag(
    @Param('flag') flag: number,
  ): Promise<TimeSlotEntity[]> {
    const listTimeSlotFlag = await this.timeSlotsService.getTimeSlotFlag(flag);
    if (!listTimeSlotFlag || listTimeSlotFlag.length == 0) {
      throw new HttpException('No data time slot', HttpStatus.NOT_FOUND);
    }
    return listTimeSlotFlag;
  }

  //Create time slot
  @Public()
  @Post()
  @ApiResponse({
    status: 200,
    description: 'CREATE TIME SLOT',
    type: String,
  })
  async createTimeSlot(@Body() dto: TimeSlotDTO): Promise<string> {
    return await this.timeSlotsService.createTimeSlot(dto);
  }

  //Delete time slot
  @Public()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'DELETE TIME SLOT',
    type: String,
  })
  async deleteTimeSlot(@Param('id') id: string): Promise<string> {
    return await this.timeSlotsService.deleteTimeSlot(id);
  }

  @Public()
  @Post('/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE TIME SLOT',
    type: boolean,
  })
  async updateTimeSlot(
    @Param('id') id: string,
    @Body() dto: TimeSlotDTO,
  ): Promise<string> {
    return await this.timeSlotsService.updateTimeSlot(id, dto);
  }
}
