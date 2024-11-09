import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image: string;

  @IsNumber()
  @IsOptional()
  tax: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  note: string;
}
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
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  paymentMethod: string;

  @ApiProperty({ required: false })
  @IsOptional()
  totalPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  subTotal?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  discountTotal?: number;

  @IsNotEmpty()
  products?: Product[];
}
