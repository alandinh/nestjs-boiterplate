import { CacheKey, CacheTTL, Controller, Get } from '@nestjs/common';

import type { IReport } from './report.service';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  @CacheKey('report_dashboard')
  @CacheTTL(5 * 60)
  async getPrice(): Promise<IReport> {
    return this.reportService.getPriceBUSD();
  }
}
