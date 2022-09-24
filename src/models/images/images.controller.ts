// import { MakeFilePublicResponse } from '@google-cloud/storage';
// import {
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
// import { Public } from 'src/decorators/public.decorator';

// import { ImagesUploadDto } from './dto/images-upload.dto';
// import { UrlImageDto } from './dto/url-image.dto';
// import { ImagesService } from './images.service';

// @ApiBearerAuth()
// @ApiTags('images')
// @Controller('images')
// export class ImagesController {
//   constructor(private readonly imagesService: ImagesService) {}

//   // @Post('/upload')
//   // @Public()
//   // @UseInterceptors(FilesInterceptor('images'))
//   // @ApiConsumes('multipart/form-data')
//   // @ApiBody({
//   //   description: 'List image',
//   //   type: ImagesUploadDto,
//   // })
//   // async createImage(
//   //   @UploadedFiles() images: Express.Multer.File[],
//   // ): Promise<UrlImageDto[]> {
//   //   return this.imagesService.uploadImagesToFirebase(images);
//   // }

//   // Got Bug =================================================================
//   // @Get('/:urlImage')
//   // @Public()
//   // async getImage(
//   //   @Param('urlImage') urlImage: string,
//   // ): Promise<MakeFilePublicResponse> {
//   //   return this.imagesService.getImageFromFirebase(urlImage);
//   // }
//   // Got Bug =================================================================

//   // @Post('/upload')
//   // @UseInterceptors(FileInterceptor('image'))
//   // @ApiConsumes('multipart/form-data')
//   // @ApiBody({
//   //   schema: {
//   //     type: 'object',
//   //     properties: {
//   //       image: {
//   //         type: 'string',
//   //         format: 'binary',
//   //       },
//   //     },
//   //   },
//   // })
//   // async uploadImage(
//   //   @UploadedFile() image: Express.Multer.File,
//   // ): Promise<UrlImageDto> {
//   //   return this.imagesService.uploadImageToFirebase(image, image.originalname);
//   // }
//   // @Delete('/:urlImage')
//   // @Public()
//   // removeImage(@Param('urlImage') urlImage: string): Promise<string> {
//   //   return this.imagesService.removeImageFireBase(urlImage);
//   // }
// }
