import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './http-client.module-definition';
import { HttpClientService } from './http-client.service';

@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule extends ConfigurableModuleClass {}
