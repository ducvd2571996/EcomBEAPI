import { Global, Module } from '@nestjs/common';
import { OrderWrappersModule } from './order-wrappers';
import { CustomerWrappersModule } from './customer-wrappers';
import { CartWrappersModule } from './cart-wrappers';

@Global()
@Module({
  imports: [OrderWrappersModule, CustomerWrappersModule, CartWrappersModule],
})
export class WrappersModule {}
