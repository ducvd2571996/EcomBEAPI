import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderPayloadDTO {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  customerId?: number;

  @IsString()
  @ApiProperty()
  orderStatus: string;

  @IsString()
  @ApiProperty()
  paymentMethod: string;
}
