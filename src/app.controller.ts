// import { MessagingDevicesResponse } from 'firebase-admin/messaging';
import { Controller, Get, Param } from '@nestjs/common';
// import { GoongMapsService } from 'shared/goong-maps.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './models/accounts/accounts.service';
// import { Public } from 'decorators/public.decorator';
// import { FirebaseMessageService } from 'providers/firebase/message/firebase-message.service';

@ApiBearerAuth()
@Controller('test')
@ApiTags('app')
export class TestController {
  constructor(
    private readonly accountService: AccountsService, // private readonly firebaseMessage: FirebaseMessageService,
  ) {}

  // @Get('/test1/:token')
  // @Public()
  // async test1(
  //   @Param('token') token: string,
  // ): Promise<MessagingDevicesResponse> {
  //   return this.firebaseMessage.getMessaging().sendToDevice(token, {
  //     data: {
  //       title: 'hello',
  //     },
  //     notification: {
  //       title: 'xin chao',
  //       body: 'haha',
  //     },
  //   });
  // }
}
