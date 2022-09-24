import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { DeliveryTripService } from './deliveryTrip.service';
import { DeliveryTripDTO } from './dto/deliveryTrip.dto';
import { DeliveryTripEntity } from './entities/deliveryTrip.entity';

@ApiBearerAuth()
@ApiTags('deliveryTrips')
@Controller('deliveryTrips')
export class DeliveryTripController {
  constructor(private readonly deliveryTripService: DeliveryTripService) {}

  //Get all delivery trip
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL DELIVERY TRIP',
    type: [DeliveryTripDTO],
  })
  @UseInterceptors(
    MapInterceptor(DeliveryTripDTO, DeliveryTripEntity, {
      isArray: true,
    }),
  )
  async getAll(): Promise<DeliveryTripEntity[] | string> {
    const listTrip = await this.deliveryTripService.getAllDeliveryTrip();
    if (!listTrip || listTrip.length == 0) {
      throw new HttpException('No data delivery trip', HttpStatus.NOT_FOUND);
    } else {
      return listTrip;
    }
  }
}
