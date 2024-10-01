import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderWrappersService } from './order-wrappers.service';
import { HttpClientModule } from 'src/shared/http-client';

@Module({
  imports: [
    HttpClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('ORDER_SERVICE_URL'),
        timeout: 30000,
        maxRedirects: 5,
        validateStatus: () => {
          return true;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OrderWrappersService],
  exports: [OrderWrappersService],
})
export class OrderWrappersModule {}
