// import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
// import { randomUUID } from 'crypto';
// import { getStorage } from 'firebase-admin/storage';
// import { MakeFilePublicResponse } from '@google-cloud/storage';
// import { UrlImageDto } from './dto/url-image.dto';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ImageEntity } from './entities/images.entity';
// import { BaseService } from '../base/base.service';

// @Injectable()
// export class ImagesService extends BaseService<ImageEntity> {
//   constructor(
//     @InjectRepository(ImageEntity)
//     private readonly imageRepository: Repository<ImageEntity>,
//   ) {
//     super(imageRepository);
//   }

//   // async uploadImageToFirebase(image: Express.Multer.File): Promise<string> {
//   //   try {
//   //     const imageName = image.originalname.split('.');
//   //     const newImageName = randomUUID() + '.' + imageName[imageName.length - 1];
//   //     const url = `images/${newImageName}`;

//   //     const bucket = getStorage().bucket();
//   //     const file = bucket.file(url);
//   //     const contents = image.buffer;
//   //     await file.save(contents);

//   //     return await `https://firebasestorage.googleapis.com/v0/b/${
//   //       bucket.name
//   //     }/o/${encodeURIComponent(url)}?alt=media`;
//   //   } catch (error) {
//   //     throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
//   //   }
//   // }

//   // async uploadImagesToFirebase(
//   //   images: Express.Multer.File[],
//   // ): Promise<UrlImageDto[]> {
//   //   const urlImages: UrlImageDto[] = [];
//   //   for (const image of images) {
//   //     const imageName = image.originalname.split('.');
//   //     const newImageName = randomUUID() + '.' + imageName[imageName.length - 1];
//   //     const urlImage = await this.uploadImageToFirebase(image, newImageName);
//   //     urlImages.push(urlImage);
//   //   }
//   //   return urlImages;
//   // }

//   // async uploadImageToFirebase(
//   //   image: Express.Multer.File,
//   //   imageName: string,
//   // ): Promise<UrlImageDto> {
//   //   const url = `images/${imageName}`;

//   //   const bucket = getStorage().bucket();
//   //   const file = bucket.file(url);
//   //   const contents = image.buffer;
//   //   await file.save(contents);

//   //   // return urlImage;
//   //   const urlImage = new UrlImageDto();
//   //   urlImage.url = `https://firebasestorage.googleapis.com/v0/b/${
//   //     bucket.name
//   //   }/o/${encodeURIComponent(url)}?alt=media`;
//   //   return urlImage;
//   // }

//   async uploadToFirebase(image: Express.Multer.File): Promise<UrlImageDto> {
//     const imageName = image.originalname.split('.');
//     const newImageName = randomUUID() + '.' + imageName[imageName.length - 1];
//     const url = `images/${newImageName}`;

//     const bucket = getStorage().bucket();
//     const file = bucket.file(url);
//     const contents = image.buffer;
//     await file.save(contents);

//     // return urlImage;
//     const urlImage = new UrlImageDto();
//     urlImage.url = `https://firebasestorage.googleapis.com/v0/b/${
//       bucket.name
//     }/o/${encodeURIComponent(url)}?alt=media`;
//     return urlImage;
//   }

//   async getImageFromFirebase(
//     urlImage: string,
//   ): Promise<MakeFilePublicResponse> {
//     const file = getStorage().bucket().file(urlImage);
//     return file.makePublic();
//   }

//   async removeImageFireBase(nameFile: string): Promise<string> {
//     const bucket = getStorage().bucket();
//     const file = bucket.file(
//       'images/' + nameFile.split('images')[1].split('?')[0].replace('%2F', ''),
//     );
//     let message = '';
//     await file
//       .delete()
//       .then(function () {
//         message = 'remove image success';
//       })
//       .catch((err) => {
//         throw new HttpException(err['errors'][0].message, HttpStatus.NOT_FOUND);
//       });
//     return message;
//   }

//   async removeImage(nameFile: string, id: string): Promise<string> {
//     const message = await this.removeImageFireBase(nameFile);
//     const deleteResult = await this.imageRepository
//       .createQueryBuilder()
//       .delete()
//       .from(ImageEntity)
//       .where('id = :id', { id: id })
//       .execute();
//     if (deleteResult.affected == 1) {
//       return message;
//     }
//   }
// }
