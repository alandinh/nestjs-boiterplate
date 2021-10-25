import { CacheKey, CacheTTL, Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get()
  @CacheKey('price_busd_usd')
  @CacheTTL(5 * 60)
  getPrice(): Observable<string> {
    return this.priceService.getPriceBUSD();
  }
}
