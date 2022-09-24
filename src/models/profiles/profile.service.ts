import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService extends BaseService<ProfileEntity> {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {
    super(profileRepository);
  }

  async updateProfile(dto: ProfileDTO, idUser: string): Promise<ProfileEntity> {
    return this.save({ id: idUser, ...dto });
  }
}
