import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { ShippersService } from './shippers.service';
import { ShipperDTO } from './dto/shippers.dto';
import { ShipperEntity } from './entities/shippers.entity';
import { boolean } from 'joi';

@ApiBearerAuth()
@ApiTags('shippers')
@Controller('shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) {}

  //List all shipper
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL SHIPPER',
    type: [ShipperDTO],
  })
  async findAll(): Promise<ShipperEntity[] | string> {
    const listShippes = await this.shippersService.getAllShippers();
    if (listShippes.length == 0) {
      throw new HttpException('No data shipper', HttpStatus.NOT_FOUND);
    } else {
      return listShippes;
    }
  }

  //Create shipper
  @Public()
  @Post()
  @ApiResponse({
    status: 200,
    description: 'CREATE SHIPPER',
    type: [ShipperDTO],
  })
  @UseInterceptors(MapInterceptor(ShipperEntity, ShipperDTO))
  async createShipper(
    @Body() dto: ShipperDTO,
  ): Promise<ShipperEntity | { message: string }> {
    return await this.shippersService.createShipper(dto);
  }

  //Remove shipper
  @Public()
  @Put('/removeShipper/:id')
  @ApiResponse({
    status: 200,
    description: 'DELETE SHIPPER',
    type: boolean,
  })
  async deleteShipper(@Param('id') id: string): Promise<string> {
    return await this.shippersService.deleteShipper(id);
  }

  //Update shipper
  @Public()
  @Post('/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE SHIPPER',
    type: boolean,
  })
  async updateShipper(
    @Param('id') id: string,
    @Body() dto: ShipperDTO,
  ): Promise<string> {
    if (await this.shippersService.updateShipper(id, dto)) {
      return 'Update successfull';
    } else {
      return 'Update fail';
    }
  }
}
