import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerEntity: Repository<CustomerEntity>,
  ) {}

  async GetCustomer(phoneNumber: string) {
    return await this.customerEntity.findOneBy({ phoneNumber });
  }

  async GetCustomerById(customerId: string) {
    return await this.customerEntity.findOneBy({ customerId });
  }

  async AddCustomer(data: any): Promise<any> {
    const existingItem = await this.customerEntity.findOneBy([
      {
        email: data?.email,
        phoneNumber: data?.phoneNumber,
      },
    ]);
    if (existingItem) {
      return { success: false };
    }
    const customer = this.customerEntity.create({
      ...data,
      address: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.customerEntity.insert(customer);
    return { ...res, success: true };
  }

  async UpdateCustomerAddress(customerId: string, address: string): Promise<any> {
    const customer = await this.customerEntity.findOneBy({ customerId });
    if (!customer) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: HttpStatus.BAD_REQUEST.toString(),
          message: 'Update failure',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    customer.address = address;
    customer.updatedAt = new Date();

    return await this.customerEntity.save(customer);
  }
}
