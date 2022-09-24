import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { KitchenDTO } from './dto/kitchen.dto';
import { KitchenEntity } from './entities/kitchens.entity';
import { KitchenService } from './kitchens.service';

@ApiBearerAuth()
@ApiTags('kitchens')
@Controller('kitchens')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}
}
