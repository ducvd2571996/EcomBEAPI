import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Coupon {
  @IsOptional()
  @ApiProperty({ required: false })
  code: string;

  @IsOptional()
  @ApiProperty({ required: false })
  value: number;
}
export class Product {
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

export class CreateCartDTO {
  @IsNotEmpty()
  products: Product[];

  @IsNumber()
  @IsNotEmpty()
  tax: number;

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  discountTotal: number;

  @ApiProperty({ required: false })
  @IsOptional()
  coupon: Coupon;

  @IsOptional()
  @ApiProperty({ required: false })
  note: string;
}

export class UpdateCartDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;

  @IsNotEmpty()
  products: Product[];

  @IsNumber()
  @IsNotEmpty()
  tax: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  discountTotal: number;

  @ApiProperty({ required: false })
  @IsOptional()
  coupon: Coupon;

  @IsOptional()
  @ApiProperty({ required: false })
  note: string;
}
