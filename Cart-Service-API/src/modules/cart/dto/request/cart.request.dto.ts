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

export class CreateCartDTO {
  @IsNotEmpty()
  products: Product[];

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  coupon?: Coupon;

  @IsOptional()
  @ApiProperty({ required: false })
  note?: string;
}

export class RemoveItemFromCartDto {
  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

export class RemoveCartDto {
  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;
}
export class UpdateCartDTO {
  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  customerId: number;

  @IsNotEmpty()
  products: Product[];

  @ApiProperty({ required: false })
  @IsOptional()
  coupon?: Coupon;

  @IsOptional()
  @ApiProperty({ required: false })
  note?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  isAddToCart?: boolean;
}
