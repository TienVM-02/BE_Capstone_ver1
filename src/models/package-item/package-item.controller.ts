// import {} from
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { PackageItemDTO } from './dto/package-item.dto';
import { PackageItemEntity } from './entities/package-item.entity';
import { PackageItemService } from './package-item.service';

@ApiBearerAuth()
@ApiTags('package-item')
@Controller('package-item')
export class PackageItemController {
  constructor(private readonly packageItemService: PackageItemService) {}

  //Get all package item.
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL PACKAGE ITEM',
    type: [PackageItemEntity],
  })
  async getAllPackagaItem(): Promise<PackageItemEntity[]> {
    const list = await this.packageItemService.getAllPackageItem();
    if (!list || list.length == 0) {
      throw new HttpException('No data package item', HttpStatus.NOT_FOUND);
    } else {
      return list;
    }
  }

  //Delete package item

  @Public()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'DELETE PACKAGE ITEM',
    type: String,
  })
  async deletePackageItem(@Param('id') id: string): Promise<string> {
    return this.packageItemService.deletePackageItem(id);
  }

  //Update package item
  @Public()
  @Put('/:id')
  @ApiOkResponse({
    status: 200,
    description: 'UPDATE PACKAGE ITEM',
    type: String,
  })
  async updatePackageItem(
    @Param('id') id: string,
    @Body() dto: PackageItemDTO,
  ): Promise<string> {
    return await this.packageItemService.updatePackageItem(id, dto);
  }
}
