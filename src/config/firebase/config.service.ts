import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FireBaseConfigService {
  constructor(private configService: ConfigService) {}

  get projectId(): string {
    return this.configService.get<string>('firebase.projectId');
  }

  get privateKey(): string {
    return this.configService
      .get<string>('firebase.privateKey')
      .replace(/\\n/g, '\n');
  }

  get clientEmail(): string {
    return this.configService.get<string>('firebase.clientEmail');
  }

  get storageBucket(): string {
    return this.configService.get<string>('firebase.storageBucket');
  }
}
