import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerWrappersService } from './customer-wrappers.service';
import { HttpClientModule } from 'src/shared/http-client';

@Module({
  imports: [
    HttpClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('CUSTOMER_SERVICE_URL'),
        timeout: 30000,
        maxRedirects: 5,
        validateStatus: () => {
          return true;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CustomerWrappersService],
  exports: [CustomerWrappersService],
})
export class CustomerWrappersModule {}
