import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartEntity } from 'src/database/entities';
import { CartRepository } from 'src/database/repositories';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [TypeOrmModule.forFeature([CartEntity])],
})
export class CartModule {}
