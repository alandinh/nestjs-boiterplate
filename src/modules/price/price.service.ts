import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { catchError, map } from 'rxjs';

import { ApiConfigService } from '../../shared/services/api-config.service';

interface IPriceAxios {
  data?: {
    BUSD?: {
      quote?: {
        USD?: {
          price?: string;
        };
      };
    };
  };
}

@Injectable()
export class PriceService {
  constructor(
    public readonly httpService: HttpService,
    public readonly configService: ApiConfigService,
  ) {}

  /**
   * Find single user
   */
  getPriceBUSD(): Observable<string> {
    const headers = {
      'X-CMC_PRO_API_KEY': this.configService.coinMarketCapKey,
    };
    const url =
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BUSD&convert=USD';

    return this.httpService.get<IPriceAxios>(url, { headers }).pipe(
      map((res) => res.data.data?.BUSD?.quote?.USD?.price || '1'),
      catchError<string, string>((_) => '1'),
    );
  }
}
