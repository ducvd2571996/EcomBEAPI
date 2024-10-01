import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { CustomerRepository } from 'src/database/repositories';
import { CustomerEntity } from 'src/database/entities';

@Module({
  controllers: [CustomerController],
  providers: [CustomerRepository, CustomerService],
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
})
export class CustomerModule {}
