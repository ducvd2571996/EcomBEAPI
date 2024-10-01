import { Injectable } from '@nestjs/common';
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

  async GetCustomerById(id: number) {
    return await this.customerEntity.findOneBy({ id });
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
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.customerEntity.insert(customer);
    return { ...res, success: true };
  }
}
