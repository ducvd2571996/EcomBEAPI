import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePosProductPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  tax: number;

  @IsNumber()
  @IsOptional()
  brand: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  categoryId: number;
}

export class UpdatePosProductPayloadDTO {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  tax: number;

  @IsNumber()
  @IsOptional()
  brand: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  categoryId: number;
}

export class GetProductListPayloadDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  maxResultCount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  categoryId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  brand: number;

  @ApiProperty({ required: false })
  @IsOptional()
  minPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  skipCount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;
}

export class GetProductListByCateIdDTO {
  @ApiProperty({ required: true })
  @IsOptional()
  cateId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  maxResultCount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  skipCount: number;
}
