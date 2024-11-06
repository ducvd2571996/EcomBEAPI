import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/database/repositories';
import { CreateCustomerPayloadDTO } from '../dto/request/create-customer-request.dto';
import { CustomerInfo } from '../dto/response/user-response.dto';
import { UpdateCustomerPayloadDTO } from '../dto/request/update-address.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(dataBody: CreateCustomerPayloadDTO) {
    const result = await this.customerRepository.AddCustomer(dataBody);
    if (!result?.success) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: '400',
          message: 'User with this phone number or email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updateUserAddress(dataBody: UpdateCustomerPayloadDTO) {
    return await this.customerRepository.UpdateCustomerAddress(dataBody?.id, dataBody?.address);
  }

  async getCustomer(phoneNumber: string): Promise<CustomerInfo> {
    return await this.customerRepository.GetCustomer(phoneNumber);
  }

  async getCustomerById(id: string): Promise<CustomerInfo> {
    return await this.customerRepository.GetCustomerById(id);
  }
}
