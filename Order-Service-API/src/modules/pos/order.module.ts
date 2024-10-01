import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosOrderEntity } from 'src/database/entities';
import { PosOrderRepository } from 'src/database/repositories';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PosOrderRepository],
  imports: [TypeOrmModule.forFeature([PosOrderEntity])],
})
export class OrderModule {}
