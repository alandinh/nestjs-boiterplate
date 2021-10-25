import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRepository])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
