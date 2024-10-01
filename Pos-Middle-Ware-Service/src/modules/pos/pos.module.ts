import { Module } from '@nestjs/common';
import { POSService } from './services/pos.service';
import { POSController } from './controllers/pos.controller';
import { OrderWrappersModule } from 'src/wrapper/order-wrappers';
import { CustomerWrappersModule } from 'src/wrapper/customer-wrappers';
import { CartWrappersModule } from 'src/wrapper/cart-wrappers';

@Module({
  controllers: [POSController],
  providers: [POSService],
  imports: [OrderWrappersModule, CustomerWrappersModule, CartWrappersModule],
})
export class OrderModule {}
