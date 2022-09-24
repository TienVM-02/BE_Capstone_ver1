import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedService } from './shared.service';
@Module({
  imports: [HttpModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
