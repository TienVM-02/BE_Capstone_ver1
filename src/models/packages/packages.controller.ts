import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { PackageService } from './packages.service';
import { PackageDTO } from './dto/packages.dto';
import { PackageEntity } from './entities/packages.entity';

@ApiBearerAuth()
@ApiTags('packages')
@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  //Get all package
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL PACKAGE',
    type: [PackageDTO],
  })
  async getAllPackage(): Promise<PackageEntity[] | string> {
    const listPackages = await this.packageService.listAllPackage();
    if (!listPackages || listPackages.length == 0) {
      throw new HttpException('No data package', HttpStatus.NOT_FOUND);
    }
    return listPackages;
  }

  //Get package
  @Public()
  @Get('/findByIsActive')
  @ApiResponse({
    status: 200,
    description: 'GET ACTIVE PACKAGE',
    type: [PackageDTO],
  })
  async getPackage(): Promise<PackageEntity[] | string> {
    const listPackages = await this.packageService.listPackageStatus();
    if (!listPackages || listPackages.length == 0) {
      throw new HttpException('No data package', HttpStatus.NOT_FOUND);
    }
    return listPackages;
  }

  // Create package
  @Public()
  @Post()
  @ApiResponse({
    status: 200,
    description: 'CREATE PACKAGE',
    type: String,
  })
  async createPackage(@Body() dto: PackageDTO): Promise<string> {
    return await this.packageService.createPackage(dto);
  }

  //Update package
  @Public()
  @Post('/update/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE PACKAGE',
    type: String,
  })
  async updatePackage(
    @Param('id') id: string,
    @Body() dto: PackageDTO,
  ): Promise<string> {
    return await this.packageService.updatePackage(id, dto);
  }

  //Update package status
  @Public()
  @Put('/updateStatus/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE PACKAGE STATUS',
    type: String,
  })
  async updatePackageStatus(@Param('id') id: string): Promise<string> {
    return await this.packageService.updateStatus(id);
  }

  //Delete package
  @Public()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'DELETE PACKAGE',
    type: String,
  })
  async deletePackage(@Param('id') id: string): Promise<string> {
    return await this.packageService.deletePackage(id);
  }
}
