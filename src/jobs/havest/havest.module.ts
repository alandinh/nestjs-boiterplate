import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportRepository } from '../../modules/report/report.repository';
import { AutoHavestService } from './havest.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRepository])],
  providers: [AutoHavestService],
})
export class HavestModule {}
